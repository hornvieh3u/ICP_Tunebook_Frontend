import React, { useState, useEffect } from "react";
import { dispatch, useDispatch, useSelector } from "../../store/index.js";
import { SetTitle } from '../../store/reducers/auth.js';
import HttpAgentInit from "../../context/HttpAgentInit.js";
import { Button } from "@material-tailwind/react";
import alert from "../../utils/Alert.js";
import loading from "../../utils/Loading.js";

function Sessions() {

    const {user} = useSelector((state) => (state.auth));

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [daytime, setDayTime] = useState("");
    const [contact, setContact] = useState("");
    const [comment, setComment] = useState("");
    const [editId, setEditId] = useState(0);

    const [sessions, setSessions] = useState([]);
    const [page, setPage] = useState(0);

    const saveSession = async () => {
        if (!name ||
            !location ||
            !daytime ||
            !contact ||
            !comment
        ) {
            alert("warning", "Please fill out the gaps correctly.");
            return;
        }

        loading();

        let res = false;
        const actor = await HttpAgentInit();
        if (editId === 0)
            res = await actor.add_session(user.principal, name, location, daytime, contact, comment);
        else
            res = await actor.update_session(editId, user.principal, name, location, daytime, contact, comment);

        if (res) {
            alert("success", `Success ${editId === 0 ? "adding" : "updating"} session.`);

            getSessions();
            initSessions();
        } else {
            alert("warning", "Fail!");
        }

        loading(false);
    }

    const initSessions = () => {
        setName("");
        setLocation("");
        setDayTime("");
        setContact("");
        setComment("");
        setEditId(0);
    }

    const editSession = session => {
        setName(session.name);
        setLocation(session.location);
        setDayTime(session.daytime);
        setContact(session.contact);
        setComment(session.comment);
        setEditId(session.id);
    }

    const getSessions = async search => {
        if (!search) search = "";

        const actor = await HttpAgentInit();
        const res = await actor.get_sessions(search, page);
        
        setSessions(res[0]);
    }

    useEffect(() => {
        getSessions();

        dispatch(SetTitle('Sessions'));
    }, [])

    return (
        <>
            <div className="grid grid-cols-3 py-8 font-plus px-10 relative w-full gap-8 text-darkblue-800 h-full">
                <div className="w-full h-full bg-white rounded-4 flex flex-col p-8 gap-8 overflow-hidden">
                    <p>{editId === 0 ? "Add" : "Update"} Session</p>
                    <div className="flex flex-col justify-start w-full gap-[5px]">
                        <div className="flex flex-row justify-start items-center">
                            <p className="font-plus font-normal text-14 leading-20">Name</p>
                            <p className="text-14 text-coral-500">*</p>
                        </div>

                        <input className="py-2 pl-4 px-4 rounded-2 w-full font-light focus:border-transparent focus:outline-none" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}  style={{
                            border: '1.5px solid #e5e7eb', // Set the border color to blue
                            height: '42px', // Adjust the font size as needed
                        }}/>
                    </div>
                    <div className="flex flex-col justify-start w-full gap-[5px]">
                        <div className="flex flex-row justify-start items-center">
                            <p className="font-plus font-normal text-14 leading-20">Location</p>
                            <p className="text-14 text-coral-500">*</p>
                        </div>

                        <input className="py-2 pl-4 px-4 font-light rounded-2 w-full font-light focus:border-transparent focus:outline-none font-bold" placeholder="London" value={location} onChange={(e) => setLocation(e.target.value)}  style={{
                            border: '1.5px solid #e5e7eb', // Set the border color to blue
                            height: '42px', // Adjust the font size as needed
                        }}/>
                    </div>
                    <div className="flex flex-col justify-start w-full gap-[5px]">
                        <div className="flex flex-row justify-start items-center">
                            <p className="font-plus  font-normal text-14 leading-20">Daytime</p>
                            <p className="text-14 text-coral-500">*</p>
                        </div>

                        <input type="datetime-local" className="py-2 pl-4 px-4 rounded-2 w-full font-normal focus:border-transparent focus:outline-none" value={daytime} onChange={(e) => setDayTime(e.target.value)} style={{
                            border: '1.5px solid #e5e7eb', // Set the border color to blue
                            height: '42px', // Adjust the font size as needed
                        }}/>
                    </div>
                    <div className="flex flex-col justify-start w-full gap-[5px]">
                        <div className="flex flex-row justify-start items-center">
                            <p className="font-plus  font-normal text-14 leading-20">Contact</p>
                            <p className="text-14 text-coral-500">*</p>
                        </div>

                        <input className="py-2 pl-4 px-4 rounded-2 w-full font-normal focus:border-transparent focus:outline-none" placeholder="jyne.master@gmail.com" value={contact} onChange={(e) => setContact(e.target.value)} style={{
                            border: '1.5px solid #e5e7eb', // Set the border color to blue
                            height: '42px', // Adjust the font size as needed
                        }}/>
                    </div>
                    <div className="flex flex-col justify-start w-full gap-[5px]">
                        <div className="flex flex-row justify-start items-center">
                            <p className="font-plus  font-normal text-14 leading-20">Comment</p>
                            <p className="text-14 text-coral-500">*</p>
                        </div>

                        <input className="py-2 pl-4 px-4 rounded-2 w-full font-normal focus:border-transparent focus:outline-none" placeholder="Will be a good day!" value={comment} onChange={(e) => setComment(e.target.value)} style={{
                            border: '1.5px solid #e5e7eb', // Set the border color to blue
                            height: '42px', // Adjust the font size as needed
                        }}/>
                    </div>
                    <div className="flex flex-row justify-between items-center w-full gap-[30px] w-[231px] pt-2">
                        <a className="fill-btn-primary text-white text-12 px-4 py-2 font-medium bg-green-450 rounded-8 w-full flex flex-row justify-center gap-45 items-center" onClick={() => saveSession()}
                            style={{textAlign: 'center', cursor: 'pointer'}}>
                            <img className="" src="/demo/assets/save.svg"/>
                            <p className='font-medium'>{editId === 0 ? "Add" : "Update"}</p>
                        </a>
                    </div>
                </div>
                <div className="col-span-2 w-full h-full bg-white rounded-4 flex flex-col p-8 gap-8 overflow-hidden">
                    <input className="py-8 pl-4 px-4 rounded-2 w-full font-light focus:border-transparent focus:outline-none" placeholder="Search for sessions" onChange={(e) => {getSessions(e.target.value);setPage(0);}} style={{
                        border: '1.5px solid #e5e7eb', // Set the border color to blue
                        height: '42px', // Adjust the font size as needed
                    }}/>

                    <div className="grid grid-cols-3 gap-4">
                        {
                            sessions.length === 0 && (
                                <p>No sessions</p>
                            )
                        }
                        {
                            sessions.map((session, idx) => (
                                <div key={idx} className="flex flex-col gap-2 p-2 border border-[#e5e7eb] text-black overflow-hidden">
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="text-right">Name:</div>
                                        <div className="col-span-2 truncate" title={session.name}>{session.name}</div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="text-right">Location:</div>
                                        <div className="col-span-2 truncate" title={session.location}>{session.location}</div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="text-right">DayTime:</div>
                                        <div className="col-span-2 truncate" title={session.daytime}>{session.daytime}</div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="text-right">Contact:</div>
                                        <div className="col-span-2 truncate" title={session.contact}>{session.contact}</div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="text-right">Comment:</div>
                                        <div className="col-span-2 truncate" title={session.comment}>{session.comment}</div>
                                    </div>
                                    {
                                        session.principal === user.principal ? (
                                            <Button color="green" size="sm" onClick={() => editSession(session)}>Edit</Button>
                                        ) : (
                                            <Button color="blue" size="sm" onClick={() => {}}>View</Button>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sessions;