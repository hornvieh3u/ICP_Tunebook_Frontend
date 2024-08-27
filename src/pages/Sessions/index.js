import React, { useState, useEffect } from "react";
import { dispatch, useDispatch, useSelector } from "../../store/index.js";
import { SetTitle } from '../../store/reducers/auth.js';

function Sessions() {

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [daytime, setDayTime] = useState("");
    const [contact, setContact] = useState("");
    const [comment, setComment] = useState("");
    const [sessions, setSessions] = useState([]);

    const addSession = async () => {

    }

    const getSessions = async () => {
        setSessions([]);
    }

    useEffect(() => {
        getSessions();

        dispatch(SetTitle('Sessions'));
    }, [])

    return (
        <>
            <div className="flex flex-row py-8 font-plus px-10 relative w-full gap-8 text-darkblue-800 h-full">
                <div className="w-full h-full bg-white rounded-4 flex flex-col p-8 gap-8 overflow-hidden">
                    <p>Add Session</p>
                    <div className="flex flex-col justify-start w-full gap-[5px]">
                        <div className="flex flex-row justify-start items-center">
                            <p className="font-plus font-normal text-14 leading-20">Name</p>
                            <p className="text-14 text-coral-500">*</p>
                        </div>

                        <input className="py-2 pl-4 px-4 rounded-2 w-full font-light focus:border-transparent focus:outline-none" placeholder="Jyne Brown" value={name} onChange={(e) => setName(e.target.value)}  style={{
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

                        <input type="datetime-local" className="py-2 pl-4 px-4 rounded-2 w-full font-normal focus:border-transparent focus:outline-none" placeholder="2024-09-23 12:00:00" onClick={(e) => setDayTime(e.target.value)} style={{
                            border: '1.5px solid #e5e7eb', // Set the border color to blue
                            height: '42px', // Adjust the font size as needed
                        }}/>
                    </div>
                    <div className="flex flex-col justify-start w-full gap-[5px]">
                        <div className="flex flex-row justify-start items-center">
                            <p className="font-plus  font-normal text-14 leading-20">Contact</p>
                            <p className="text-14 text-coral-500">*</p>
                        </div>

                        <input className="py-2 pl-4 px-4 rounded-2 w-full font-normal focus:border-transparent focus:outline-none" placeholder="jyne.master@gmail.com" value={contact} onClick={(e) => setContact(e.target.value)} style={{
                            border: '1.5px solid #e5e7eb', // Set the border color to blue
                            height: '42px', // Adjust the font size as needed
                        }}/>
                    </div>
                    <div className="flex flex-col justify-start w-full gap-[5px]">
                        <div className="flex flex-row justify-start items-center">
                            <p className="font-plus  font-normal text-14 leading-20">Comment</p>
                            <p className="text-14 text-coral-500">*</p>
                        </div>

                        <input className="py-2 pl-4 px-4 rounded-2 w-full font-normal focus:border-transparent focus:outline-none" placeholder="Will be a good day!" value={comment} onClick={(e) => setComment(e.target.value)} style={{
                            border: '1.5px solid #e5e7eb', // Set the border color to blue
                            height: '42px', // Adjust the font size as needed
                        }}/>
                    </div>
                    <div className="flex flex-row justify-between items-center w-full gap-[30px] w-[231px] pt-2">
                        <a className="fill-btn-primary text-white text-12 px-4 py-2 font-medium bg-green-450 rounded-8 w-full flex flex-row justify-center gap-45 items-center" onClick={() => addSession()}
                            style={{textAlign: 'center', cursor: 'pointer'}}>
                            <img className="" src="/demo/assets/save.svg"/>
                            <p className='font-medium'>Add</p>
                        </a>
                    </div>
                </div>
                <div className="w-full h-full bg-white rounded-4 flex flex-col p-8 gap-8 overflow-hidden">

                </div>
            </div>
        </>
    )
}

export default Sessions;