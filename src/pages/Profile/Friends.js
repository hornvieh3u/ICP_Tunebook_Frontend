import React, { useState, useEffect } from "react";
import { dispatch, useSelector } from "../../store/index.js";
import { SetTitle } from '../../store/reducers/auth.js';
import { Button, Avatar, Typography } from "@material-tailwind/react";
import HttpAgentInit from "../../context/HttpAgentInit.js";
import { convertUInt8ArrToImageData } from "../../utils/format.js";
import alert from "../../utils/Alert.js";
import loading from "../../utils/Loading.js";

function Friends() {

    const {user} = useSelector((state) => (state.auth));
    const [searchword, setSearchword] = useState("");
    const [myFriends, setMyFriends] = useState([]);
    const [incoming, setIncoming] = useState([]);
    const [outgoing, setOutgoing] = useState([]);
    const [searchedPersons, setSearchedPersons] = useState([]);
    const [activeTab, setActiveTab] = useState("friends");

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
    }

    const sendFriendRequest = async targetPrincipal => {

        loading();

        const actor = await HttpAgentInit();
        let res = await actor.send_friend_request(user.principal, targetPrincipal);

        if (res) {
            setSearchedPersons([]);
            refreshProfile();
            alert("success", "Success");
        } else {
            alert("danger", "Fail");
        }

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

        setSearchword(keyword);

        if (keyword === "") {
            setSearchedPersons([]);
            return;
        }

        const actor = await HttpAgentInit();
        let [people, count] = await actor.browse_people(keyword, 0);
        
        const friendsPrincipals = myFriends.map(i => i.principal);
        const incomingPrincipals = incoming.map(i => i.principal);
        const outgoingPrincipals = outgoing.map(i => i.principal);

        let persons = [];
        for(let i = 0; i < people.length; i++) {
            if (people[i].principal === user.principal ||
                friendsPrincipals.indexOf(people[i].principal) !== -1 ||
                incomingPrincipals.indexOf(people[i].principal) !== -1 ||
                outgoingPrincipals.indexOf(people[i].principal) !== -1
            ) continue;
            people[i].imageData = await convertUInt8ArrToImageData(people[i].avatar);

            persons.push(people[i]);
        }

        setSearchedPersons(persons);
    }

    return (
        <>
        <div className="flex flex-row py-8 font-plus px-10 relative w-full gap-8 text-darkblue-800 h-full">
            <div className="w-full h-full bg-white rounded-4 flex flex-col p-8 gap-8 overflow-hidden">
                <div className="flex flex-col gap-2">
                    <p>Add Friends</p>
                    <input className="py-8 pl-4 px-4 rounded-2 w-full font-light border border-green-500 h-px" placeholder="Search persons" onChange={(e) => {browsePeople(e.target.value);}}/>
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
                                    <Button size="sm" color="blue">View</Button>
                                </div>
                            ))
                        }
                        {
                            activeTab === "requests" && outgoing.map(o => (
                                <div className="flex flex-col gap-4 rounded-2 border border-green-500 p-4">
                                    <Avatar className="block mx-auto" src={o.imageData} alt="avatar" variant="rounded" />
                                    <Typography className="text-center">{o.username}</Typography>
                                    <Button size="sm" color="purple" onClick={() => cancelFriendRequest(o.principal)}>Cancel</Button>
                                </div>
                            ))
                        }
                        {
                            activeTab === "incoming" && incoming.map(i => (
                                <div className="flex flex-col gap-4 rounded-2 border border-green-500 p-4">
                                    <Avatar className="block mx-auto" src={i.imageData} alt="avatar" variant="rounded" />
                                    <Typography className="text-center">{i.username}</Typography>
                                    <Button size="sm" color="red" onClick={() => acceptFriendRequest(i.principal)}>Accept</Button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Friends;