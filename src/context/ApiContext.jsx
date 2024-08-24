import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "../store";
import { AuthClient, LocalStorage } from "@dfinity/auth-client";
import { HttpAgent, Actor } from "@dfinity/agent";
import axios from "../utils/Axios"
import { useHistory } from 'react-router-dom';
import { Logout, SetIdentity } from "../store/reducers/auth";
import { Principal } from '@dfinity/principal'; 
import { encodeArrayBuffer} from '../utils/format.js';
import { ShowModal } from "../store/reducers/menu.js";
import alert from "../utils/Alert.js";

export const APIContext = React.createContext();

export const APIProvider = ({ children }) => {
    const MAX_CHUNK_SIZE = 1024 * 500; // 500kb
    const {user, isLoggedIn} = useSelector((store) => store.auth);
    const history = useHistory();
    const dispatch = useDispatch();
    const [principal, setPrincipal] = useState(''); 
    // const [isSessionExpired, setIsSessionExpired] = useState(false);

    useEffect(() => {        
        setPrincipal(user.principal);
    }, [user.principal])

    const logout = () => {
        // console.log("history", history)

        // history.push("/");
        alert("info", "Session is expired")

        dispatch(ShowModal(""))
        dispatch(Logout({}))
    }

    const initAgent = async (init = false) => {
        let authClient, identity, agent;

        authClient = await AuthClient.create();
        let isSessionExpired = false
        if(authClient.isAuthenticated) {
            identity = authClient.getIdentity();
    
            agent = new HttpAgent({ identity, 
                host : process.env.REACT_APP_DFX_NETWORK != "ic" ? process.env.REACT_APP_PUBLIC_HOST : process.env.REACT_APP_PUBLIC_HOST_IC});  
    
            if(process.env.REACT_APP_DFX_NETWORK != "ic") {
                await agent.fetchRootKey();
            }

            console.log("principal", principal)

            if(!init && principal != identity.getPrincipal().toText()) {
                isSessionExpired = true;

                console.log("session", identity.getPrincipal().toText())
                console.log("sessionExpired~~~~~~~", isSessionExpired)

                logout();

                return {agent: null};
            }

            return {identity: identity, agent: agent, isSessionExpired: isSessionExpired}
        } else {
            return {agent: null};
        }
    }

    const getProfileInfoAPI = async (userPrincipal = null) => {
        const result = await axios.post("api/v/users/getProfile", {
            filter: {
                userPrincipal : userPrincipal
            }
        });

        console.log("result", result)

        return result;
    }

    const followArtistAPI = async (artist, follow) => {
        const result = await axios.post("api/v/users/followArtist", {
            artist: artist,
            userPrincipal : user.principal,
            follow: follow   
        });

        return result;
    }

    const signIn = async (userPrincipal = null) => {
        const result = await axios.post("api/v/users/signin", {userPrincipal : userPrincipal});

        return result;
    }

    const uploadProfile = async (profileInfo, userInfo) => {   
        // let { agent } = await initAgent();
        
        // if (agent == null) 
        //     return null;
        
        // let accountActor = Actor.createActor(AccountIDL, {
        //     agent,
        //     canisterId: process.env.REACT_APP_DFX_NETWORK != "ic"? process.env.REACT_APP_MANAGER_CANISTER_ID : process.env.REACT_APP_IC_MANAGER_CANISTER_ID
        // });
        
        // console.log("profileInfo", userInfo);

        // let result = await Promise.all([accountActor.editProfileInfo(profileInfo), 
        //     axios.post("api/v/users/uploadProfile", {
        //     ...userInfo})
        // ]);

        // console.log(result);

        // return result;
    }
    
    const createContentInfo = async (contentInfo) => {
        // let {agent} = await initAgent();
        
        // if (agent == null) 
        //     return null;

        // let contentManagerActor = Actor.createActor(ContentManagerIDL, {
        //     agent,
        //     canisterId: process.env.REACT_APP_DFX_NETWORK != "ic"? process.env.REACT_APP_CONTENT_MANAGER_CANISTER_ID : process.env.REACT_APP_IC_CONTENT_MANAGER_CANISTER_ID
        // });

        // let result = await contentManagerActor.createContent(contentInfo);

        // return result;
    }

    const uploadTrackInfo = async (trackInfo) => {
        const result = axios.post("api/v/tracks/uploadTracks", {
            ...trackInfo})

        return result;
    }

    // const upgradeContentCanister = async (contentInfo) => {
    //     let {agent} = await initAgent();
        
    //     if (agent == null) 
    //         return null;

    //     let contentManagerActor = Actor.createActor(ContentManagerIDL, {
    //         agent,
    //         canisterId: process.env.REACT_APP_CONTENT_MANAGER_CANISTER_ID
    //     });

    //     let result = await contentManagerActor.createContent(contentInfo);

    //     return result;
    // }


    const processAndUploadChunk = async (
        audioInfo, contentCanisterId, contentId
    )  => {
        // const t0 = performance.now();

        // let { agent } = await initAgent();
        
        // if (agent == null) 
        //     return null;

        // let putChunkPromises = [];

        // let contentActor = Actor.createActor(ContentIDL, {
        //     agent,
        //     canisterId: contentCanisterId
        // });

        // let chunk = 1;
        // for (let byteStart = 0; byteStart < audioInfo.size; byteStart += MAX_CHUNK_SIZE, chunk++ ) {
        //     putChunkPromises.push(
        //         putContentChunk(audioInfo.data, byteStart, contentId, contentCanisterId, chunk, audioInfo.size, contentActor)
        //     );
        // }

        // let result = await Promise.all(putChunkPromises)

        // console.log("result", result)

        // const t1 = performance.now();
        // console.log("Upload took " + (t1 - t0) / 1000 + " seconds.")

        // return null;
    }

    const putContentChunk = async (blob,
        byteStart,
        contentId,
        contentCanisterId,
        chunk,
        fileSize, 
        contentActor) => {

        const t0 = performance.now();

        const blobSlice = blob.slice(
            byteStart,
            Math.min(Number(fileSize), byteStart + MAX_CHUNK_SIZE),
            blob.type
        );
        const bsf = await blobSlice.arrayBuffer();

        let result = await contentActor.putContentChunk(contentId, chunk, encodeArrayBuffer(bsf));

        const t1 = performance.now();
        console.log("Upload one took " + (t1 - t0) / 1000 + " seconds.")

        return result;        
    }

    const getTracksByArtistAPI = async (artist, searchWord, page, pageSize, sort, sortBy) => {
        try {
            const data = await axios.post("api/v/tracks/getTracks", {
                filter: {
                    artist: artist
                },
                searchWord: searchWord,
                page : page,
                pageSize : pageSize,
                sort : sort,
                sortBy : sortBy
            });
    
            return data;
        } catch {            
            return [];
        }
    }

    const getReleasedTracksByArtist = async (artist, searchWord, page, pageSize, sort, sortBy) => {
        const data = await axios.post("api/v/tracks/getTracks", {
            filter: {
                artist: artist,
                isReleased: true
            },
            searchWord: searchWord,
            page : page,
            pageSize : pageSize,
            sort : sort,
            sortBy : sortBy        
        });

        console.log("data");

        return data;
    }

    const getFavouriteTracksAPI = async (artist, searchWord, page, pageSize, sort, sortBy) => {
        const data = await axios.post("api/v/tracks/getFavouriteTracks", {
            artist : artist,    
            searchWord: searchWord,
            page : page,
            pageSize : pageSize,
            sort : sort,
            sortBy : sortBy                
        });

        return data;
    }

    const getAllReleasedTracks = async (searchWord, page, pageSize, sort, sortBy) => {

        const data = await axios.post("api/v/tracks/getTracks", {
            filter: {
                isReleased: true
            },
            searchWord: searchWord,
            page : page,
            pageSize : pageSize,
            sort : sort,
            sortBy : sortBy
        });

        return data;
    }

    const getTrackInfoAPI = async (contentId) => {
        const data = await axios.post("api/v/tracks/getTrackInfo", {
            filter: {
                contentId: contentId
            },
        });
    
        return data;
    }

    const logPlayHistory = async (contentId) => {
        const data = await axios.post("api/v/tracks/logPlayHistory", {
            filter: {
                contentId: contentId
            }, 
        });

        return data;
    }

    const releaseTrackItem = async (contentId, release = true) => {
        const data = await axios.post("api/v/tracks/releaseTrack", {
            filter: {
                contentId: contentId
            }, 
            update : {
                isReleased: release
            }
        });

        return data;
    }

    const checkDisplayName = async (displayname, userPrincipal) => {
        const data = await axios.post("api/v/users/checkDisplayName", {
            displayname : displayname,
            userPrincipal : userPrincipal
        });

        return data;
    }
    
    const uploadFile = async (data) => {
        const res = await axios.post("api/v/files/", data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        return res;
    };

    const addToFavouriteAPI = async (artist, contentId) => {
        const result = await axios.post("api/v/users/addToFavourite", {artist: artist, contentId: contentId, add: true});

        return result;
    }

    const removeFromFavouriteAPI = async (artist, contentId) => {
        const result = await axios.post("api/v/users/addToFavourite", {artist: artist, contentId: contentId, add: false});

        return result;
    }

    return (
        <APIContext.Provider
            value={{
                signIn,
                getProfileInfoAPI,
                uploadProfile,
                createContentInfo,
                getTracksByArtistAPI,
                getTrackInfoAPI,
                getAllReleasedTracks,
                getReleasedTracksByArtist,
                getFavouriteTracksAPI,
                processAndUploadChunk,
                followArtistAPI,
                logPlayHistory,
                releaseTrackItem,
                checkDisplayName,
                uploadFile,
                uploadTrackInfo,
                addToFavouriteAPI,
                removeFromFavouriteAPI
            }}
        >
            {children}
        </APIContext.Provider>
    );
};


