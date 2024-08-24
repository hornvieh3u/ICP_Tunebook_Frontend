import React, { useState, useContext } from 'react';
import { AvatarInput } from '../DragDrop/AvatarInput';
import { useDispatch } from '../../store';
import { ShowModal } from '../../store/reducers/menu';
import { useSelector } from '../../store';
import { useEffect } from 'react';
import { APIContext } from "../../context/ApiContext.jsx";
import alert from '../../utils/Alert.js';
import { Principal } from '@dfinity/principal';
import loading from "../../utils/Loading.js";
import { Logout, UpdateInfo } from '../../store/reducers/auth.js';
import { BASE_URL } from '../../config';

import { base64ToBlob, convertImageToBase64, encodeArrayBuffer, getBinaryFileSizeFromBase64} from '../../utils/format.js';

function ProfileEditModal() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [displayname, setDisplayname] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarData, setAvatarData] = useState("");
    const [fileType, setFileType] = useState("");
    const [createdAt, setcreatedAt] = useState("");
    const {user} = useSelector((state) => (state.auth));
    const { uploadProfile, checkDisplayName, uploadFile } = useContext(APIContext);

    const handleAvatar = async (image) => {   
        setAvatarData(image);
    }

    const setAvatarDataFromUrl = async () => {
        const data = await convertImageToBase64(user.avatar);
        setAvatarData(data);
    }

    const saveProfile = async () => {
        try{
            if(!displayname || !username || !avatarData) {
                alert("warning", "Please input profile info")
            } else {            
                loading();

                if(getBinaryFileSizeFromBase64(avatarData) > 512000) {
                    loading(false);

                    alert('info', "File size shouldn't be bigger than 500Kb");

                    return;
                }  
                
                let matches = avatarData.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/);
                setFileType(matches[1]);
                
                let avatarImage = avatarData.replace(/^data:(.*,)?/, '');
                if ((avatarImage.length % 4) > 0) {
                    avatarImage += '='.repeat(4 - (avatarImage.length % 4));
                }
                
                await checkDisplayName(displayname, user.principal);
                
                const imageBlob = base64ToBlob(avatarImage, matches[1]);
                
                const formData = new FormData();
                formData.append('file', imageBlob, "avatar.png");
                
                const uploadData = await uploadFile(formData);
                
                let bsf = await imageBlob.arrayBuffer();
                
                let profileInfo_3 = {
                    displayName: displayname,
                    userName: username,
                    createdAt: createdAt,
                    updatedAt: Number(Date.now() * 1000),
                    userPrincipal: Principal.fromText(user.principal),          
                    avatar: [encodeArrayBuffer(bsf)],
                    fileType: [fileType]
                }
                
                let profileInfo_2 = {
                    userPrincipal: user.principal,          
                    displayname: displayname,
                    username: username,
                    createdAt: createdAt,
                    updatedAt: Number(Date.now() * 1000),
                    avatar: uploadData.uri
                }
                const result = await uploadProfile(profileInfo_3, profileInfo_2);
    
                loading(false);
    
                let userInfo = {
                    displayname: displayname,
                    username: username,
                    avatar: `${BASE_URL}/` + uploadData.uri,
                    isInitialized: true
                }

                if(!result) {
                    alert('warning', "Failure on updating profile")
                } else {
                    alert('success', "Success on updating profile")
                    dispatch(UpdateInfo({userInfo : userInfo}));    
                    dispatch(ShowModal(""))
                }
            }
        } catch (err) {
            console.log(err.message);
            loading(false);
            alert('warning', "failure on updating profile")
        }
    }

    const cancel = () => {
        if(user.isInitialized) {
            dispatch(ShowModal(""));
        } else {
            alert("warning", "Pleasee create profile")
        }
    }

    useEffect(() => {       
        setUsername(user.username);
        setDisplayname(user.displayname);
        setAvatar(user.avatar);
        setAvatarDataFromUrl();
        setFileType(user.fileType);
        setcreatedAt(user.createdAt);
    }, [user])
    
    return (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center text-white">
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="flex w-full flex-row justify-center items-center px-4">
                    <div style={{maxWidth: "469px", maxHeight: '666px', margin: '0 auto', backgroundColor: "rgba(22, 28, 42, 0.95)"}} className="w-full p-4 sm:p-6 md:p-8 gap-[20px] bg-opacity-40 rounded-5 shadow-bottom_1 flex justify-start flex-col items-center">                    
                        <p className="text-white font-plus font-bold text-18 leading-22">Profile details</p>
                        <div className="flex flex-col justify-center items-center w-full">
                            <div className="relative cursor-pointer flex justify-center items-center z-20">
                                <AvatarInput avatar={avatar} setAvatar={handleAvatar}/>
                            </div>                                
                        </div>
                        <div className="relative flex flex-col justify-start w-full gap-[5px]">
                            <div className="flex flex-row justify-start items-center">
                                <p className="font-plus text-white font-light text-14 leading-20">Display name</p>
                                <p className="text-14 text-coral-500">*</p>
                            </div>
                            <input className="bg-primary-700 py-2 px-4 rounded-3 text-white font-plus font-normal outline-none border-transparent focus:border-transparent focus:ring-0" value={displayname} onChange={(e) => setDisplayname(e.target.value)} style={{height: '36px'}}></input>
                        </div>
                        <div className="relative flex flex-col justify-start w-full gap-[5px]">
                            <div className="flex flex-row justify-start items-center">
                                <p className="font-plus text-white font-light text-14 leading-20">User name</p>
                                <p className="text-14 text-coral-500">*</p>
                            </div>
                            <input className="bg-primary-700 py-2 px-4 rounded-3 text-white font-plus font-normal outline-none border-transparent focus:border-transparent focus:ring-0" value={username} onChange={(e) => setUsername(e.target.value)} style={{height: '36px'}}></input>
                        </div>
                        <div className="relative flex flex-col justify-start w-full gap-[5px]">
                            <div className="flex flex-row justify-start items-center">
                                <p className="font-plus text-white font-light text-14 leading-20">Principal</p>
                                <p className="text-14 text-coral-500">*</p>
                            </div>
                            <input readOnly className="bg-primary-700 py-2 px-4 rounded-3 text-white font-plus font-normal outline-none border-transparent focus:border-transparent focus:ring-0" value={user.principal} style={{height: '36px'}}></input>
                        </div>
                        <div className="flex flex-row justify-between items-center w-full gap-[30px] w-[231px] pt-2">
                            <a className="outline-btn text-12 px-4 py-2 font-medium rounded-8 w-full cursor-pointer" 
                                style={{border: '2px solid white', textAlign: 'center'}} onClick={() => cancel()}>Cancel</a>
                            <a className="fill-btn-primary text-12 px-4 py-2 text-white font-medium bg-darkblue-600 rounded-8 w-full flex flex-row justify-center gap-45 items-center" onClick={() => saveProfile()}
                                style={{textAlign: 'center', cursor: 'pointer'}}>
                                <img className="" src="/demo/assets/save.svg"/>
                                <p className='text-white font-medium'>Save</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileEditModal;