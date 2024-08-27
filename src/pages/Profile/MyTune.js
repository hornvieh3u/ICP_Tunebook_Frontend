import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "../../store";
import { SetTitle, SetOrgTunes, SetCurrentTune } from '../../store/reducers/auth.js';
import ABCJS from "abcjs";
import 'abcjs/abcjs-audio.css';
import ReactPaginate from 'react-paginate';
import HttpAgentInit from "../../context/HttpAgentInit.js";
import { convertUInt8ArrToImageData } from "../../utils/format.js";
import { LOCAL_STORAGE_KEYS } from "../../const/variable.js";

function MyTune() {
    const history = useHistory();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => (state.auth));
    const [orgTunes, setOrgTunes] = useState([]);
    const [currentTuneData, setCurrentTuneData] = useState("");
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [tuneId, setTurnId] = useState(0);
    const perPage = 15;

    const synth = new ABCJS.synth.CreateSynth();
    const synthControl = new ABCJS.synth.SynthController();

    useEffect(() => {
        dispatch(SetTitle('My Tunebook'));

        getOrgTunes();
    }, [])

    const getOrgTunes = async () => {       

        const actor = await HttpAgentInit();

        let res = await actor.get_user_tune_list(user.principal, currentPage);

        setTotalPage(res[1]);

        for(let i = 0; i < res[0].length; i++) {
            // res[0][i].imageData = await convertUInt8ArrToImageData(res[0][i].thumbnail);
            res[0][i].imageData = "/demo/assets/camera.png";
        }

        dispatch(SetOrgTunes(res[0]));
        setOrgTunes(res[0]);
    }
    
    const iniABCJS = async (currentTuneData) => {
        if(!currentTuneData)
            return;

        const visualObj = ABCJS.renderAbc("tunedata", currentTuneData,  { responsive: "resize" });

        try {
            await synth.init({ visualObj: visualObj[0] });
            
            await synthControl.setTune(visualObj[0], false, {});

            await synthControl.load("#player", null, {
                displayRestart: true,
                displayPlay: true,
                displayProgress: true,
                displayWarp: true
            });
            // await synthControl.play();
        } catch (error) {
            console.error("Error initializing or playing the tune", error);
        }
    }

    const onSelectTune = async (selectedTune) => {
        if(!selectedTune) return;
        // console.log("selectTune", selectedTune)

        const actor = await HttpAgentInit();
        const tuneData = await actor.get_user_tune(user.principal, selectedTune.title);

        // console.log("tuneData", tuneData);

        setCurrentTuneData(tuneData);
        setTurnId(selectedTune.id);

        dispatch(SetCurrentTune({ origin: true, title: selectedTune, data: tuneData}));
        const visualObj = ABCJS.renderAbc("tunedata", tuneData,  { responsive: "resize" });

        await synth.init({ visualObj: visualObj[0] });
        await synthControl.setTune(visualObj[0], false, {});
    }

    const editMyTune = () => {
        localStorage.setItem(LOCAL_STORAGE_KEYS.EDIT_TUNE_ID, tuneId);
        history.push("/app/playground");
    }

    useEffect(() => {
        iniABCJS(currentTuneData);
    }, [currentTuneData])

    useEffect(() => {
        getOrgTunes();
    }, [currentPage]);

    return (
    <>
      <div className="flex flex-col py-8 font-plus px-10 relative w-full gap-8 text-darkblue-800 h-full">
        <div className="w-full h-full flex flex-row pb-8 px-2 md:px-4 lg:px-16 gap-16">

            <div className="w-full h-full flex flex-col gap-4 overflow-y-auto">
                {orgTunes.map((tune, index) => (
                    <div className="flex rounded-4 bg-white px-4 py-2 flex-row w-full justify-start items-center gap-4 cursor-pointer" key={index} onClick={() => {onSelectTune(tune)}}>  
                        <img className="rounded-8 w-12 h-12" src={tune.imageData}
                            style={{
                                border: '3px solid #faca15' // Adjust the font size as needed
                        }}/>
                        <p className="font-plus-bold font-bold text-16">{tune.title.replaceAll(".abc", "")}</p>
                    </div>
                ))}

                <div className="w-full flex flex-col md:flex-row text-gray-400">
                {totalPage > perPage ? ( <div style={{alignItems: "center", justifyContent:"end"}} >
                    <ReactPaginate
                    className="inline-flex text-sm h-8 mt-6 text-gray-400"
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    nextLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight
                    border rounded-e-lg bg-primary border-white text-white hover:bg-white hover:text-green-450"
                    previousLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight
                        border rounded-s-lg bg-primary border-white text-white hover:bg-white hover:text-green-450"
                    breakLabel={"..."}
                    selectedPageRel={1}
                    breakClassName=""
                    breakLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight
                    border bg-primary border-white text-white hover:bg-white hover:text-green-450"
                    pageCount={Math.ceil(totalPage / perPage)}
                    pageLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight
                    border bg-primary border-white hover:bg-white hover:text-green-450 text-gray-600"
                    pageClassName="text-black"
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                    onPageChange={page => setCurrentPage(page.selected)}
                    containerClassName={"pagination"}
                    activeLinkClassName="flex items-center justify-center h-8 border border-white hover:bg-blue-100 hover:text-green-450 border-white bg-white text-green-450"
                    />
                </div>) : ("")}
                </div>
            </div>

            <div className="w-full h-full bg-white rounded-4 flex flex-col gap-4 p-8">
                <div className="flex w-full items-center px-3 gap-3">
                    <div id="player" className="flex-grow"></div>
                    {!currentTuneData && (
                    <>
                        <div className="flex w-full items-center justify-center px-3 gap-3 text-[24px] font-normal">
                            Please select a tune to view.
                        </div>
                    </>
                    )}
                    {/* {currentTuneData && (
                        <a className="fill-btn-secondary text-11 px-4 py-1 text-white font-medium bg-green-450 rounded-2 cursor-pointer flex flex-row justify-center gap-45 items-center"
                            style={{textAlign: 'center'}} onClick={() => editMyTune()}>
                            <p className='text-white font-medium'>Edit</p>
                        </a>
                    )} */}
                </div>
                <div className="flex w-full flex-col y-scrollable-tag overflow-y-auto">
                    <div id="tunedata" className="text-gray-800 flex-grow"></div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default MyTune;
