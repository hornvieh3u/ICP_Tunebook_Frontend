import React, { useEffect, useRef, useState, memo, Suspense } from "react";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { dispatch, useDispatch, useSelector } from "../../store/index.js";
import loading from "../../utils/Loading.js";
import alert from "../../utils/Alert.js";
import { UpdateInfo, SetTitle, SetOrgTunes, SetCurrentTune } from '../../store/reducers/auth.js';
import ABCJS from "abcjs";
import 'abcjs/abcjs-audio.css';
import { ThumbnailInput } from "../../components/DragDrop/ThumbnailInput.js";
import { base64ToBlob, convertImageDataToUInt8Arr } from "../../utils/format.js";
import HttpAgentInit from "../../context/HttpAgentInit.js";
import { LOCAL_STORAGE_KEYS } from "../../const/variable.js";

function Playground() {
    const history = useHistory();
    const dispatch = useDispatch();
    const {user, currentTune} = useSelector((state) => (state.auth));
    const [currentTuneData, setCurrentTuneData] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [title, setTitle] = useState("");
    const synth = new ABCJS.synth.CreateSynth();
    const synthControl = new ABCJS.synth.SynthController();

    const handleThumbnail = async (image) => {   
        setThumbnail(image);
    }
    useEffect(() => {
        dispatch(SetTitle('Playground'));
    }, [])

    useEffect(() => {
        setCurrentTuneData(currentTune.data);
    }, [])
    
    useEffect(() => {
        initABC(currentTuneData)
    }, [currentTuneData])
    
    const initABC = async (currentTuneData) => {
        const visualObj = ABCJS.renderAbc("tunedata", currentTuneData,  { responsive: "resize" });
        
        try {
            await synth.init({ visualObj: visualObj[0] });
            await synthControl.setTune(visualObj[0], false, {});
            synthControl.load("#player", null, {
            displayRestart: true,
            displayPlay: true,
            displayProgress: true,
            displayWarp: true})
        } catch (error) {
        console.error("Error initializing or playing the tune", error);
        }
    }

    const addToTuneBook = async() => {
        if(!title) {
            alert("warning", "Please input title");
            return;
        }

        if(!thumbnail) {
            alert("warning", "Please input thumbnail");
            return;
        }

        loading();

        try {
            const actor = await HttpAgentInit();
            const editTurnId = localStorage.getItem(LOCAL_STORAGE_KEYS.EDIT_TUNE_ID);
            if (editTurnId) {
                const updateTuneResult = await actor.update_tune(Number(parseInt(editTurnId)), user.principal, title, currentTuneData, currentTuneData == currentTune.data, await convertImageDataToUInt8Arr(thumbnail));
                if (updateTuneResult) {
                    alert("success", "Success on updating to tunebook");
                } else {
                    alert("warning", "Failure on operation");
                }
                localStorage.removeItem(LOCAL_STORAGE_KEYS.EDIT_TUNE_ID);
            } else {
                const addTuneResult = await actor.add_tune(user.principal, title, currentTuneData, currentTuneData == currentTune.data, await convertImageDataToUInt8Arr(thumbnail));
                if (addTuneResult) {
                    alert("success", "Success on adding to tunebook");
                } else {
                    alert("warning", "Failure on operation");
                }
            }
            loading(false);
        } catch (error) {
            console.log(error);

            alert("warning", "Failure on operation");
            loading(false);
            
            localStorage.removeItem(LOCAL_STORAGE_KEYS.EDIT_TUNE_ID);
            history.goBack();
        }
    };

    return (
    <>
      <div className="flex flex-row py-8 font-plus px-10 relative w-full gap-8 text-darkblue-800 h-full">
        <div className="w-full h-full flex flex-col py-8 px-16">
            <div className="w-full bg-white rounded-2 p-4 flex flex-row gap-16 flex justify-center items-center">
                <a className="fill-btn-secondary text-11 px-4 py-1 text-white font-medium bg-green-450 rounded-2 cursor-pointer flex flex-row justify-center gap-45 items-center"
                    style={{textAlign: 'center'}}
                    onClick={() => {history.goBack()}}>
                    <p className='text-white font-medium'>Back</p>
                </a>
                <div id="player" class="flex-grow"></div>
                <a className="fill-btn-secondary text-11 px-4 py-1 text-white font-medium bg-green-450 rounded-2 cursor-pointer flex flex-row justify-center gap-45 items-center"
                    style={{textAlign: 'center'}}
                    onClick={() => {addToTuneBook()}}>
                    <p className='text-white font-medium'>Add to My TuneBook</p>
                </a>
            </div>

            <div className="w-full h-full flex flex-row py-8 gap-12">

                <div className="w-full h-full text-gray-800 flex flex-col gap-4 px-8 overflow-y-auto bg-white rounded-4 y-scrollable-tag overflow-y-auto">
                    <div id="tunedata"></div>
                </div>

                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-full h-full bg-white rounded-4 flex flex-col gap-4 p-8">
                        <input className="py-2 pl-4 px-4 rounded-2 w-full text-gray-600 font-light focus:border-transparent focus:outline-none" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}  style={{
                            border: '1.5px solid #e5e7eb', // Set the border color to blue
                            height: '42px', // Adjust the font size as needed
                        }}/>
                        <textarea className="w-full h-full" value={currentTuneData} onChange={(e) => {setCurrentTuneData(e.target.value)}}></textarea>
                        <div className="relative cursor-pointer flex justify-center items-center z-20">
                            <ThumbnailInput setThumbnail={handleThumbnail}/>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default Playground;
