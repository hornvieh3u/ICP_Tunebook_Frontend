import React, { useState, useEffect } from "react";
import { dispatch, useDispatch, useSelector } from "../../store/index.js";
import { SetTitle } from '../../store/reducers/auth.js';
import HttpAgentInit from "../../context/HttpAgentInit.js";
import { Button } from "@material-tailwind/react";
import Select from "react-tailwindcss-select";
import alert from "../../utils/Alert.js";
import loading from "../../utils/Loading.js";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import { REPEAT_DURATION } from "../../const/variable.js";

function Sessions() {

    const {user} = useSelector((state) => (state.auth));

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [dayTime, setDayTime] = useState("");
    const [dayDuation, setDayDuration] = useState();
    const [contact, setContact] = useState("");
    const [comment, setComment] = useState("");
    const [editId, setEditId] = useState(0);

    const [searchword, setSearchword] = useState("");
    const [sessions, setSessions] = useState([]);

    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 15;

    const saveSession = async () => {
        if (!name ||
            !location ||
            !dayTime ||
            !dayDuation?.value ||
            !contact ||
            !comment
        ) {
            alert("warning", "Please fill out the gaps correctly.");
            return;
        }

        loading();

        let res = false;
        const dateTime = `${dayTime},${dayDuation.value}`;
        const actor = await HttpAgentInit();
        if (editId === 0)
            res = await actor.add_session(user.principal, name, location, dateTime, contact, comment);
        else
            res = await actor.update_session(editId, user.principal, name, location, dateTime, contact, comment);

        if (res) {
            alert("success", `Success ${editId === 0 ? "adding" : "updating"} session.`);

            getSessions(searchword);
            // initSessions();
        } else {
            alert("warning", "Fail!");
        }

        loading(false);
    }

    const initSessions = () => {
        setName("");
        setLocation("");
        setDayTime("");
        setDayDuration();
        setContact("");
        setComment("");
        setEditId(0);
    }

    const editSession = session => {
        const dayInfo = session.daytime.split(",");
        setName(session.name);
        setLocation(session.location);
        setDayTime(dayInfo[0]);
        setDayDuration({value:dayInfo[1],label:dayInfo[1]});
        setContact(session.contact);
        setComment(session.comment);
        setEditId(session.id);
    }

    const getSessions = async search => {
        if (!search) search = "";
        setSearchword(search);

        const actor = await HttpAgentInit();
        const res = await actor.get_sessions(search, currentPage);
        
        setSessions(res[0]);
        setTotalPage(res[1]);
    }

    const getLocation = async () => {
        loading();

        let response = await axios.get("https://api.ipdata.co?api-key=fdb53543784eb922894cdfb0cbf6854e9bb8d66513fe52efcba37c89");
        let locate = `${response.data.country_name}, ${response.data.city}`;
        setLocation(locate);
        getSessions(locate);

        loading(false);
    }

    useEffect(() => {
        // getLocation();
        getSessions();

        dispatch(SetTitle('Sessions'));
    }, [])

    useEffect(() => {
        getSessions();
    }, [currentPage])

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

                        <input className="py-2 pl-4 px-4 font-light rounded-2 w-full font-light focus:border-transparent focus:outline-none font-bold" placeholder="London" value={location} onChange={(e) => setLocation(e.target.value)} style={{
                            border: '1.5px solid #e5e7eb', // Set the border color to blue
                            height: '42px', // Adjust the font size as needed
                        }}/>
                    </div>
                    <div className="flex flex-col justify-start w-full gap-[5px]">
                        <div className="flex flex-row justify-start items-center">
                            <p className="font-plus  font-normal text-14 leading-20">Daytime</p>
                            <p className="text-14 text-coral-500">*</p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <input type="datetime-local" className="col-span-2 py-2 pl-4 px-4 rounded-2 w-full font-normal focus:border-transparent focus:outline-none" placeholder="12:00" value={dayTime} onChange={(e) => setDayTime(e.target.value)} style={{
                                border: '1.5px solid #e5e7eb', // Set the border color to blue
                                height: '39px', // Adjust the font size as needed
                            }}/>
                            {/* <Select
                                isMultiple={false}
                                placeholder="Select day..."
                                value={dayOfWeek}
                                onChange={(value) => setDayOfWeek(value)}
                                options={DAY_OF_WEEK}
                            /> */}

                            <Select
                                isMultiple={false}
                                placeholder="Select duration..."
                                value={dayDuation}
                                onChange={(value) => setDayDuration(value)}
                                options={REPEAT_DURATION}
                            />
                        </div>
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
                    <input className="py-8 pl-4 px-4 rounded-2 w-full font-light focus:border-transparent focus:outline-none" placeholder="Search for sessions with name or location." value={searchword} onChange={(e) => {getSessions(e.target.value);setCurrentPage(0);}} style={{
                        border: '1.5px solid #e5e7eb', // Set the border color to blue
                        height: '42px', // Adjust the font size as needed
                    }}/>
                    <div className="overflow-y-auto">
                        <div className="grid grid-cols-3 gap-4">
                            {
                                sessions.length === 0 && (
                                    <p>No sessions</p>
                                )
                            }
                            {
                                sessions.map((session, idx) => {
                                    let dayInfo = session.daytime.split(",");
                                    return (
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
                                                <div className="text-right">Since:</div>
                                                <div className="col-span-2 truncate" title={dayInfo[0]}>{dayInfo[0]}</div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                                <div className="text-right">Repeatly:</div>
                                                <div className="col-span-2 truncate" title={dayInfo[1]}>{dayInfo[1]}</div>
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
                                                session.principal === user.principal && (
                                                    <Button color="green" size="sm" onClick={() => editSession(session)}>Edit</Button>
                                                )
                                            }
                                        </div>
                                    )
                                })
                            }
                            
                        </div>
                        <div className="w-full flex flex-col md:flex-row text-gray-400">
                            {totalPage > perPage ? ( <div style={{alignItems: "center", justifyContent:"end"}} >
                                <ReactPaginate
                                    className="inline-flex text-sm h-8 mt-6 text-gray-400"
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    nextLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight
                                    border rounded-e-lg bg-primary border-green-300 text-gray-400 hover:bg-white hover:text-green-600"
                                    previousLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight
                                        border rounded-s-lg bg-primary border-green-300 text-gray-400 hover:bg-white hover:text-green-600"
                                    breakLabel={"..."}
                                    selectedPageRel={1}
                                    breakClassName=""
                                    breakLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight
                                    border bg-primary border-green-300 text-gray-400 hover:bg-white hover:text-green-600"
                                    pageCount={Math.ceil(totalPage / perPage)}
                                    pageLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight
                                    border bg-primary border-green-300 hover:bg-white hover:text-green-600 text-gray-400"
                                    pageClassName="text-black"
                                    marginPagesDisplayed={1}
                                    pageRangeDisplayed={2}
                                    onPageChange={page => setCurrentPage(page.selected)}
                                    containerClassName={"pagination"}
                                    activeLinkClassName="flex items-center justify-center h-8 border border-green-300 hover:bg-blue-100 hover:text-green-600 border-green-300 bg-white text-green-600"
                                />
                            </div>) : ("")}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sessions;