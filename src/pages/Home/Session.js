import React, { useEffect, useRef, useState, memo, Suspense } from "react";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "../../store/index.js";
import { SetTitle } from '../../store/reducers/auth.js';
import ABCJS from "abcjs";
import 'abcjs/abcjs-audio.css';

function Session() {
    const history = useHistory();
    const dispatch = useDispatch();
    const {user, currentTune} = useSelector((state) => (state.auth));
    const [currentTuneData, setCurrentTuneData] = useState("");

    const synth = new ABCJS.synth.CreateSynth();
    const synthControl = new ABCJS.synth.SynthController();

    useEffect(() => {
        dispatch(SetTitle('Session'));
    }, [])

    useEffect(() => {
        setCurrentTuneData(currentTune.data);
        synthControl.load("#player", null, {
        displayRestart: true,
        displayPlay: true,
        displayProgress: true,
        displayWarp: true})
    }, [])

    useEffect(() => {
        initABC(currentTuneData)
    }, [currentTuneData])

    const initABC = async (currentTuneData) => {
        const visualObj = ABCJS.renderAbc("tunedata", currentTuneData,  { responsive: "resize" });

        try {
            await synth.init({ visualObj: visualObj[0] });
            await synthControl.setTune(visualObj[0], false, {});
        } catch (error) {
        console.error("Error initializing or playing the tune", error);
        }
    }

    const addToTuneBook = () => {

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

                <div className="w-full h-full bg-white rounded-4 flex flex-col gap-4 p-8">
                    <textarea className="w-full h-full" value={currentTuneData}></textarea>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default Session;
