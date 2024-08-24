import React, { useEffect, useRef, useState, memo, Suspense } from "react";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { dispatch, useDispatch, useSelector } from "../../store";
import { UpdateInfo, SetTitle, SetOrgTunes, SetCurrentTune } from '../../store/reducers/auth.js';
import ABCJS from "abcjs";
import 'abcjs/abcjs-audio.css';
import ReactPaginate from 'react-paginate';
import { keyInfo, rhythmInfo } from "../../const/variable.js";
import Select from "react-tailwindcss-select";
import HttpAgentInit from "../../context/HttpAgentInit.js";

function Tunes() {
    const history = useHistory();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => (state.auth));
    const [orgTunes, setOrgTunes] = useState([]);
    const [currentTuneData, setCurrentTuneData] = useState("");
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 15;
    const [searchTitle, setSearchTitle] = useState('');
    const [key, setKey] = useState({ value: "all", label: "All key" });
    const [rhythm, setRhythm] = useState({ value: "all", label: "All Rhythm" });

    const synth = new ABCJS.synth.CreateSynth();
    const synthControl = new ABCJS.synth.SynthController();

    useEffect(() => {
        dispatch(SetTitle('Browse Tunes'));

        getOrgTunes();
    }, [])

    const handlePageChange = (data) => {
        // console.log(data.selected);
        setCurrentPage(data.selected);
    };

    const getOrgTunes = async () => {       

        const actor = await HttpAgentInit();

        let res = await actor.filter_tunes(searchTitle, rhythm.value, key.value, currentPage);

        console.log("res", res);

        setTotalPage(res[1]);

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
        console.log("selectTune", selectedTune)

        const actor = await HttpAgentInit();
        const tuneData = await actor.get_original_tune(selectedTune.title);
        setCurrentTuneData(tuneData);

        dispatch(SetCurrentTune({ origin: true, title: selectedTune.title, data: tuneData}));
        const visualObj = ABCJS.renderAbc("tunedata", tuneData,  { responsive: "resize" });

        await synth.init({ visualObj: visualObj[0] });
        await synthControl.setTune(visualObj[0], false, {});
    }

    useEffect(() => {
        iniABCJS(currentTuneData);
    }, [currentTuneData])

    useEffect(() => {
        getOrgTunes();
    }, [currentPage, rhythm, key, searchTitle]);

    return (
    <>
      <div className="flex flex-col py-8 font-plus px-10 relative w-full gap-8 text-darkblue-800 h-full">
        <div className="flex flex-col justify-start w-full gap-8 px-2 md:px-4 lg:px-16">
            <input className="py-8 pl-4 px-4 rounded-2 w-full font-light focus:border-transparent focus:outline-none" placeholder="Search for tunes" value={searchTitle} onChange={(e) => {setSearchTitle(e.target.value);setCurrentPage(0);}}  style={{
                border: '1.5px solid #e5e7eb', // Set the border color to blue
                height: '42px', // Adjust the font size as needed
            }}/>

            <div className="flex flex-row justify-start w-full gap-4 text-gray-400">
                <div className="w-40">
                    <Select
                        value={rhythm}
                        onChange={(value) => setRhythm(value)}
                        options={rhythmInfo}
                    />
                </div>
                <div className="w-40">
                    <Select
                        value={key}
                        onChange={(value) => setKey(value)}
                        options={keyInfo}
                    />
                </div>
            </div>
        </div>
        <div className="w-full h-full flex flex-row pb-8 px-2 md:px-4 lg:px-16 gap-16">

            <div className="w-full h-full flex flex-col gap-4 overflow-y-auto">
                {orgTunes.map((tune, index) => (
                    <div className="flex rounded-4 bg-white px-4 py-2 flex-row w-full justify-start items-center gap-4 cursor-pointer" key={index} onClick={() => {onSelectTune(tune)}}>  
                        <img className="rounded-8 w-12 h-12" src="/demo/assets/camera.png"
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
                    onPageChange={handlePageChange}
                    containerClassName={"pagination"}
                    activeLinkClassName="flex items-center justify-center h-8 border border-white hover:bg-blue-100 hover:text-green-450 border-white bg-white text-green-450"
                    />
                </div>) : ("")}
                </div>
            </div>

            <div className="w-full h-full bg-white rounded-4 flex flex-col gap-4 p-8">
                <div class="flex w-full items-center px-3 gap-3">
                    <div id="player" class="flex-grow"></div>
                    {!currentTuneData && (
                    <>
                        <div class="flex w-full items-center justify-center px-3 gap-3 text-[24px] font-normal">
                            Please select a tune to edit
                        </div>
                    </>
                    )}
                    {currentTuneData && (
                        <a className="fill-btn-secondary text-11 px-4 py-1 text-white font-medium bg-green-450 rounded-2 cursor-pointer flex flex-row justify-center gap-45 items-center"
                            style={{textAlign: 'center'}} onClick={() => {history.push("/app/playground")}}>
                            <p className='text-white font-medium'>Edit</p>
                        </a>
                    )}
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

export default Tunes;
