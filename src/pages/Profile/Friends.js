import React, { useState, useEffect } from "react";
import { dispatch, useSelector } from "../../store/index.js";
import { SetTitle } from '../../store/reducers/auth.js';
import { Button, Avatar, Typography } from "@material-tailwind/react";
import HttpAgentInit from "../../context/HttpAgentInit.js";
import { convertUInt8ArrToImageData } from "../../utils/format.js";
import alert from "../../utils/Alert.js";
import loading from "../../utils/Loading.js";
import { Modal } from "flowbite-react";

function Friends() {

    const {user} = useSelector((state) => (state.auth));
    const [searchword, setSearchword] = useState("");
    const [myFriends, setMyFriends] = useState([]);
    const [incoming, setIncoming] = useState([]);
    const [outgoing, setOutgoing] = useState([]);
    const [searchedPersons, setSearchedPersons] = useState([]);
    const [activeTab, setActiveTab] = useState("friends");
    const [userProfile, setUserProfile] = useState({});
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        dispatch(SetTitle('Friends'));

        refreshProfile();
        getMyFriends();
    }, []);

    const refreshProfile = async () => {
        const actor = await HttpAgentInit();
        const profile = await actor.authentication(user.principal);

        for (let i = 0; i < profile[0].incoming_fr.length; i++) {
            profile[0].incoming_fr[i].imageData = await convertUInt8ArrToImageData(profile[0].incoming_fr[i].avatar);
        }
        setIncoming(profile[0].incoming_fr);

        for (let i = 0; i < profile[0].outcoming_fr.length; i++) {
            profile[0].outcoming_fr[i].imageData = await convertUInt8ArrToImageData(profile[0].outcoming_fr[i].avatar);
        }
        setOutgoing(profile[0].outcoming_fr);
    }

    const getMyFriends = async () => {
        const actor = await HttpAgentInit();
        const friends = await actor.get_friends(user.principal);
        for (let i = 0; i < friends.length; i++) {
            friends[i].imageData = await convertUInt8ArrToImageData(friends[i].avatar);
        }

        setMyFriends(friends);
        browsePeople();
    }

    const sendFriendRequest = async targetPrincipal => {

        loading();

        const actor = await HttpAgentInit();
        let res = await actor.send_friend_request(user.principal, targetPrincipal);
        if (res.length !==0) {
            alert("success", "Success");
        } else {
            alert("danger", "Fail");
        }

        setSearchedPersons([]);
        refreshProfile();

        loading(false);
    }

    const acceptFriendRequest = async targetPrincipal => {

        loading();

        const actor = await HttpAgentInit();
        let res = await actor.accept_friend_request(user.principal, targetPrincipal);
        if (res) {
            getMyFriends();
            refreshProfile();
            alert("success", "Success");
        } else {
            alert("danger", "Fail");
        }

        loading(false);
    }

    const cancelFriendRequest = async targetPrincipal => {
        loading();

        loading(false);
    }

    const browsePeople = async keyword => {
        cancelFriendRequest
        keyword ||= "";
        setSearchword(keyword);

        const actor = await HttpAgentInit();
        let [people, count] = await actor.browse_people(user.principal, keyword, 0);
        
        let persons = [];
        for(let i = 0; i < people.length; i++) {
            people[i].imageData = await convertUInt8ArrToImageData(people[i].avatar);
            persons.push(people[i]);
        }

        setSearchedPersons(persons);
    }

    const viewFriendProfile = async principal => {
        loading();

        const actor = await HttpAgentInit();
        const res = await actor.authentication(principal);
        res[0].imageData = await convertUInt8ArrToImageData(res[0].avatar);

        setUserProfile(res[0]);
        setOpenModal(true);

        loading(false);
    }

    return (
        <>
        <div className="flex flex-row py-8 font-plus px-10 relative w-full gap-8 text-darkblue-800 h-full">
            <div className="w-full h-full bg-white rounded-4 flex flex-col p-8 gap-8 overflow-hidden">
                <div className="flex flex-col gap-2">
                    <p>Add Friends</p>
                    <input className="py-8 pl-4 px-4 rounded-2 w-full font-light border border-green-500 focus:border-transparent focus:outline-none h-0" placeholder="Search for persons" onChange={(e) => {browsePeople(e.target.value);}} style={{
                        border: '1.5px solid #e5e7eb', // Set the border color to blue
                        height: '42px', // Adjust the font size as needed
                    }}/>
                </div>
                <div className="grid grid-cols-2 gap-4 overflow-y-auto">
                    {
                        (searchword !== "") && (searchedPersons.length === 0) && (
                            <div>No matched person</div>
                        )
                    }
                    {
                        searchedPersons.map((person, idx) => (
                            <div key={idx} className="flex flex-row rounded-2 border border-green-500 h-16 p-2 content-center justify-between">
                                <Avatar src={person.imageData} alt="avatar" variant="rounded" />
                                <Typography className="content-center">{person.username}</Typography>
                                <Button size="sm" color="green" onClick={() => sendFriendRequest(person.principal)}>Request</Button>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="w-full h-full bg-white rounded-4 flex flex-col gap-4 p-8 overflow-hidden">
                <div className="flex flex-row gap-4">
                    <Button size="sm" color={activeTab === "friends" ? "blue" : "white"} onClick={() => setActiveTab("friends")}>My Friends</Button>
                    <Button size="sm" color={activeTab === "requests" ? "purple" : "white"} onClick={() => setActiveTab("requests")}>Requests</Button>
                    <Button size="sm" color={activeTab === "incoming" ? "red" : "white"} onClick={() => setActiveTab("incoming")}>Incoming</Button>
                </div>
                <div>
                    {
                        activeTab === "friends" && myFriends.length === 0 && (
                            <p>No friends. Please send friend request.</p>
                        )
                    }
                    {
                        activeTab === "requests" && outgoing.length === 0 && (
                            <p>No requests.</p>
                        )
                    }
                    {
                        activeTab === "incoming" && incoming.length === 0 && (
                            <p>No incoming requests</p>
                        )
                    }
                    <div className="grid grid-cols-4 gap-4 overflow-y-auto">
                        {
                            activeTab === "friends" && myFriends.map(friend => (
                                <div className="flex flex-col gap-4 rounded-2 border border-green-500 p-4">
                                    <Avatar className="block mx-auto" src={friend.imageData} alt="avatar" variant="rounded" />
                                    <Typography className="text-center">{friend.username}</Typography>
                                    <Button size="sm" color="blue" onClick={() => viewFriendProfile(friend.principal)}>View</Button>
                                </div>
                            ))
                        }
                        {
                            activeTab === "requests" && outgoing.map(o => (
                                <div className="flex flex-col gap-4 rounded-2 border border-green-500 p-4">
                                    <Avatar className="block mx-auto" src={o.imageData} alt="avatar" variant="rounded" />
                                    <Typography className="text-center">{o.username}</Typography>
                                    {/* <Button size="sm" color="purple" onClick={() => cancelFriendRequest(o.principal)}>Cancel</Button> */}
                                </div>
                            ))
                        }
                        {
                            activeTab === "incoming" && incoming.map(i => (
                                <div className="flex flex-col gap-4 rounded-2 border border-green-500 p-4">
                                    <Avatar className="block mx-auto" src={i.imageData} alt="avatar" variant="rounded" />
                                    <Typography className="text-center">{i.username}</Typography>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button size="sm" color="blue" onClick={() => viewFriendProfile(i.principal)}>View</Button>
                                        <Button size="sm" color="red" onClick={() => acceptFriendRequest(i.principal)}>Accept</Button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
        {
            openModal && (
                <div className="modal-overlay fixed inset-0 flex items-center justify-center text-black">
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="flex w-full flex-row justify-center items-center px-4">
                            <div style={{maxWidth: "469px", maxHeight: '666px', margin: '0 auto', backgroundColor: "rgba(255, 255, 255)"}} className="w-full p-4 sm:p-6 md:p-8 gap-[20px] bg-opacity-40 rounded-5 shadow-bottom_1 flex justify-start flex-col items-center">                    
                                <div className="flex flex-col justify-center items-center w-full">
                                    <div className="relative cursor-pointer flex justify-center items-center z-20">
                                        <Avatar src={userProfile.imageData} alt="avatar" variant="rounded" />
                                    </div>                                
                                </div>
                                <p className="text-black font-plus font-bold text-18 leading-22">{userProfile.username}</p>
                                <div className="relative flex flex-col justify-start w-full gap-[5px]">
                                    <div className="flex flex-row justify-start items-center">
                                        <p className="font-plus text-black font-light text-14 leading-20">Location</p>
                                    </div>
                                    <input readOnly className="border bg-gray-100 py-2 px-4 rounded-3 text-black font-plus font-normal outline-none border-green-400 focus:border-transparent focus:ring-0" value={userProfile.pob} style={{height: '36px'}}></input>
                                </div>
                                <div className="relative flex flex-col justify-start w-full gap-[5px]">
                                    <div className="flex flex-row justify-start items-center">
                                        <p className="font-plus text-black font-light text-14 leading-20">Instruments</p>
                                    </div>
                                    <input readOnly className="border bg-gray-100 py-2 px-4 rounded-3 text-black font-plus font-normal outline-none border-green-400 focus:border-transparent focus:ring-0" value={userProfile.instruments} style={{height: '36px'}}></input>
                                </div>
                                <Button className="w-full mt-2" size="md" color="green" onClick={() => setOpenModal(!openModal)}>
                                    Ok
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        </>
    )
}

export default Friends;