
import { CloseIcon, MuteVolumeIcon, NextIcon, PauseIcon, PlayIcon, PreviousIcon, SuffleIcon, RepeatIcon, RepeatOnceIcon, RepeatRoundIcon, ResumeIcon, VolumeIcon, SuffleActiveIcon } from "../../icons";
import { Slider } from "@material-tailwind/react";
import { dispatch, useSelector } from "../../store";
import { useEffect, useCallback } from "react";
import { convertToDataURL, getSuffleNumber } from "../../utils/format";
import { useState, useContext, useRef } from "react";
import { APIContext } from "../../context/ApiContext";
import DisplayTrack from "./DisplayTrack";
import { Principal } from "@dfinity/principal";
import ProgressBar from "./ProgressBar";
import { useDispatch } from "../../store";
import { hideAudioPlay } from "../../store/reducers/player";
import { UpdateSongList } from "../../store/reducers/auth";
import CircularSpinnerSm from "../../components/Animated/CircularSpinnerSm";
import CircularSpinnerMd from "../../components/Animated/CircularSpinnerMd";
import { BASE_URL } from '../../config';

export default function AudioPlayer() {
    const player = useSelector((state) => state.player);
    const { play, tracks, currentIndex } = player;
    const { getProfileInfo, logPlayHistory } = useContext(APIContext);
    
    const [repeated, setRepeated] = useState(0);
    const [timeProgress, setTimeProgress] = useState(0);
    const [bufferedProgress, setBufferedProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [trackIndex, setTrackIndex] = useState(0);
    
    const [isSuffled, setIsSuffled] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(60);
    const [muteVolume, setMuteVolume] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isBufferLoading, setIsBufferLoading] = useState(false);

    const dispatch = useDispatch();

    const togglePlayPause = () => {
      setIsPlaying((prev) => !prev);
    };

    // reference
    const audioRef = useRef();
    const progressBarRef = useRef();
    const playAnimationRef = useRef();

    const repeat = useCallback(() => {
        if(!audioRef.current)
            return;
        
        const currentTime = audioRef.current.currentTime;
        
        const bufferedRanges = audioRef.current.buffered;
        let bufferedEnd = 0;
        for (let i = 0; i < bufferedRanges.length; i++) {
            bufferedEnd = Math.max(bufferedEnd, bufferedRanges.end(i));
        }
        const bufferedProgress = (bufferedEnd / audioRef.current.duration) * 100;
        
        setBufferedProgress(bufferedProgress);
        setTimeProgress(currentTime);
    
        if(bufferedProgress < ((progressBarRef.current.value / duration) * 100) || progressBarRef.current.value == 0) {
            setIsBufferLoading(true);
        } else {
            setIsBufferLoading(false);
        }

        progressBarRef.current.value = currentTime;
        progressBarRef.current.style.setProperty(
          '--range-progress',
          `${(progressBarRef.current.value / duration) * 100}%`
        );    

        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef, duration, progressBarRef, setTimeProgress, setBufferedProgress]);

    const setCurrentTrackInfo = async (tracks, currentIndex) => {  
        const thumbnailUrl = `${BASE_URL}/` + tracks[currentIndex].thumbnail
        
        logPlayHistory(tracks[currentIndex].contentId).then(result => {
            dispatch(UpdateSongList());
        })

        let trackInfo;

        if(process.env.REACT_APP_DFX_NETWORK != "ic") {
            trackInfo = {
                src : "http://127.0.0.1:4943/?canisterId=" + Principal.from(tracks[currentIndex].canisterId).toText() + "&contentId=" + tracks[currentIndex].contentId,
                thumbnailUrl : thumbnailUrl,
                title : tracks[currentIndex].title,
                cover : tracks[currentIndex].cover,
                duration : tracks[currentIndex].duration  
            }            
        } else {
            trackInfo = {
                src : "https://" + Principal.from(tracks[currentIndex].canisterId).toText() + ".raw.icp0.io/?&contentId=" + tracks[currentIndex].contentId,
                thumbnailUrl : thumbnailUrl,
                title : tracks[currentIndex].title,
                cover : tracks[currentIndex].cover,
                duration : tracks[currentIndex].duration  
            }
        }

        console.log("track", trackInfo);
        setCurrentTrack(trackInfo);

        setTimeout(() => {
            setIsLoaded(true);
        }, 10)
    }

    const setVolumeValue = (value) => {
        setVolume(value)
        if(muteVolume) {
            setMuteVolume(false)
        }
    }

    const handleNext = (isManual) => {        
        setDuration(0);
        
        setTimeProgress(0);
        
        setBufferedProgress(0)
        
        setIsLoaded(false)
        if(repeated == 0 && isManual != true) {
            closeAudioPanel();
            return;
        } else if (repeated == 1 && isManual != true) {
            setCurrentTrackInfo(tracks, currentIndex);
            return;
        } 

        if(isSuffled) {
            const newIndex = getSuffleNumber(0, tracks.length - 1, currentIndex);
            setTrackIndex(newIndex);
            setCurrentTrackInfo(tracks, newIndex);
            return;
        }

        if (trackIndex >= tracks.length - 1) {
            setTrackIndex(0);
            setCurrentTrackInfo(tracks, 0);
        } else {
            setTrackIndex((prev) => prev + 1);
            setCurrentTrackInfo(tracks, trackIndex + 1);
        }
    };

    const handlePrevious = () => {
        setDuration(0);

        setTimeProgress(0);

        setBufferedProgress(0)

        setIsLoaded(false)
        if (trackIndex === 0) {
          let lastTrackIndex = tracks.length - 1;
          setTrackIndex(lastTrackIndex);
          setCurrentTrackInfo(tracks, lastTrackIndex);
        } else {
          setTrackIndex((prev) => prev - 1);
          setCurrentTrackInfo(tracks, trackIndex - 1);
        }
    };

    const closeAudioPanel = () => {
        dispatch(hideAudioPlay())
    }

    const setRepeat = () => {
        setRepeated((prev) => prev + 1 > 2 ? 0 : prev + 1);
    }

    const setSuffle = () => {
        if(!isSuffled) {
            setRepeated(2);
        } else {
            setRepeated(0)
        }
        setIsSuffled(prev => !prev);
    }    

    useEffect(() => {
        if(player.play) {
            setCurrentTrack(null);

            setIsPlaying(false);

            togglePlayPause();
        }
    }, [player])
   
    useEffect(() => {
        if(tracks.length) {
            setTrackIndex(currentIndex)

            setCurrentTrackInfo(tracks, currentIndex);
        } else {
            setDuration(0);

            setTimeProgress(0);

            setBufferedProgress(0)

            setCurrentTrack(null);

            setTrackIndex(0);

            setIsLoaded(false);
        }
        return () => {
            setDuration(0);

            setTimeProgress(0);

            setBufferedProgress(0)

            setCurrentTrack(null);

            setTrackIndex(0);

            setIsLoaded(false);
        }
    }, [tracks, currentIndex])

       
    useEffect(() => {
        if(audioRef.current) {
            if (isPlaying) {
              audioRef.current.play();
            } else {
              audioRef.current.pause();
            }
        }

        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef, isPlaying, repeat]);


    useEffect(() => {
        if (audioRef.current) {
          audioRef.current.volume = volume / 100;
          audioRef.current.muted = muteVolume;
        }
    }, [volume, audioRef, muteVolume]);

    return (
        <>
            {(play) && (                
                <div className="absolute font-plus text-white bottom-0 left-0 w-full z-40" style={{boxShadow: "0px -20px 40px rgba(0, 0, 0, 0.45)"}}>
                    <div className="flex relative justify-start items-center w-full bg-primary-700 w-fixed md:gap-[10px] md:py-[20px] px-[10px] md:px-[30px]">
                        <div className="absolute bottom-2 md:top-2 right-2 cursor-pointer" onClick={() => closeAudioPanel()}>
                            <CloseIcon/>
                        </div>
                        <div className="absolute flex bottom-1 left-2 block justify-center items-center md:hidden gap-[10px]">
                            <div className="relative left-0 top-0 rounded-md w-[36px] h-[36px]">
                                <img src={currentTrack?.thumbnailUrl} className="absolute left-0 top-0 rounded-md w-[36px] h-[36px]"/>
                                {isBufferLoading && <div className="absolute bottom-0 left-0 z-10 w-[36px] h-[36px] rounded-md" style={{backgroundColor: "rgba(0, 0, 0, 0.55)"}}/>}   
                                {isBufferLoading && <div className="absolute bottom-1 left-2 cursor-pointer" onClick={() => closeAudioPanel()}>
                                    <CircularSpinnerSm/>
                                </div>}
                            </div>
                            <div className="flex flex-col hidden xs:block md:hidden w-[70px]">
                                <p className="text-12 font-medium truncate">{currentTrack?.cover}</p>
                                <p className="text-10 font-normal truncate">{currentTrack?.title}</p>
                            </div>
                        </div>
                        <div className="flex justify-start hidden md:block items-center w-[56px]">
                            <div className="relative rounded-md w-[56px] h-[56px]">
                                <img src={currentTrack?.thumbnailUrl} className="absolute left-0 top-0 rounded-md w-[56px] h-[56px]"/>
                                {isBufferLoading && <div className="absolute bottom-0 left-0 z-10 w-[56px] h-[56px] rounded-md" style={{backgroundColor: "rgba(0, 0, 0, 0.55)"}}/>}   
                                {isBufferLoading && <div className="absolute bottom-1 left-1 cursor-pointer z-20" onClick={() => closeAudioPanel()}>
                                    <CircularSpinnerMd/>
                                </div>}
                            </div>
                        </div>
                        {isLoaded ? (<DisplayTrack
                            {...{
                                currentTrack,
                                audioRef,
                                volume,
                                muteVolume,
                                setDuration,
                                progressBarRef,
                                handleNext
                            }}
                        />) : ("")}
                       
                        <div className="flex justify-start items-center w-full">
                            <div className="flex flex-col justify-around items-start hidden lg:block gap-[6px] pr-2">
                                <p className="text-16 font-bold leading-20">{currentTrack?.cover}</p>
                                <p className="text-14 font-normal leading-18 truncate w-[90px]">{currentTrack?.title}</p>
                            </div>
                            <div className="flex flex-col md:flex-row flex-grow justify-start items-center md:px-3 md:gap-[12px]">
                                <div className="flex flex-row justify-start items-center order-2 md:order-1 gap-[13px]">
                                    <div className="relative h-6 w-6">
                                        <div className="cursor-pointer" onClick={() => setSuffle()}>
                                            {isSuffled? <SuffleActiveIcon/> : <SuffleIcon/>}
                                        </div>
                                    </div>
                                    <div className="relative h-6 w-6">
                                        <div className="cursor-pointer" onClick={() => handlePrevious()}>
                                            <PreviousIcon/>
                                        </div>
                                    </div>
                                    <div className="relative h-[40px] w-[40px]]">
                                        <div className="cursor-pointer" onClick={() =>  togglePlayPause()}>
                                            {isPlaying? (<PauseIcon/>) : (<PlayIcon/>)}
                                        </div>
                                    </div>
                                    <div className="relative h-6 w-6">
                                        <div className="cursor-pointer" onClick={() => handleNext(true)}>
                                            <NextIcon/>
                                        </div>
                                    </div>
                                    <div className="relative h-6 w-6">
                                        <div className="cursor-pointer" onClick={() => setRepeat()}>
                                            {repeated == 0 ? <RepeatIcon/> : ""}
                                            {repeated == 1 ? <RepeatOnceIcon/> : ""}
                                            {repeated == 2 ? <RepeatRoundIcon/> : ""}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-start md:pl-4 order-1 md:order-2" style={{maxWidth:"1100px", width:"100%", margin: '0 auto 0 0'}}>
                                    {<ProgressBar
                                        {...{ progressBarRef, audioRef, timeProgress, bufferedProgress, duration }}
                                    />}                                 
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center items-center hidden md:block" style={{width: "160px"}}>                
                            <div className="flex justify-end items-center w-[140px]">
                                <div className="cursor-pointer pr-4" onClick={() => setMuteVolume((prev) => !prev)}>
                                    {muteVolume? (<MuteVolumeIcon/>) : (<VolumeIcon/>)}
                                </div>
                                <div className="flex" style={{width: "160px"}}>
                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={volume}
                                    onChange={(e) => setVolumeValue(e.target.value)}
                                    style={{
                                        background: `linear-gradient(to right, #0060D9 ${volume}%, #ccc ${volume}%)`,
                                    }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
} 