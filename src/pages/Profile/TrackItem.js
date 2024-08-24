import React, { useEffect, useRef, useState, useContext } from "react";
import * as Icon from "../../icons/index.js";
import { APIContext } from "../../context/ApiContext.jsx";
import { formatDuration, convertToDataURL, formatDate} from "../../utils/format.js";
import { Principal } from '@dfinity/principal'; 
import audioPlay from "../../utils/AudioPlay.js";
import { useDispatch } from "../../store/index.js";
import { hideAudioPlay } from "../../store/reducers/player.js";
import loading from "../../utils/Loading.js";
import { UpdateSongList } from "../../store/reducers/auth.js";
import { BASE_URL } from '../../config.js';

function TrackItem({trackItem, index, play}) {
    const dispatch = useDispatch();
    const { releaseTrackItem } = useContext(APIContext);

    const playAudio = async () => {
      dispatch(hideAudioPlay());
      
      play(index)
    }

    const releaseTrack = async (release) => {
      loading();
      
      await releaseTrackItem(trackItem.contentId, release);

      dispatch(UpdateSongList());

      loading(false);
    }

    // useEffect(() => {
    //   console.log("trackItem", trackItem)
      
    //   settrackItem(trackItem)
    // }, [trackItem])

    return (<>
     <tr style={{color: "white"}} className="font-normal border-b bg-transparent border-gray-700 cursor-pointer hover:bg-primary-800 transition-all duration-200 ease-in-out dark" >
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500"
         style={{ maxWidth: '200px'}}>
          <div className="flex justify-start items-center flex-row pl-4 gap-[30px]" >
            <img className="rounded-2 w-[60px] h-[60px]" src={`${BASE_URL}/` + trackItem.thumbnail}/>
            <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{trackItem.title}</p>
          </div>
        </td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500">{trackItem.cover}</td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500">{Number(trackItem.playCount)}</td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500">{formatDuration(Number(trackItem.duration))}</td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500"><div className="min-w-[100px]">{formatDate(Number(trackItem.createdAt) / 1000)}</div></td>
        <td className="px-4 py-3 text-center">{!trackItem.isReleased? <a className="cursor-pointer fill-btn-primary text-14 py-2 px-2 font-medium bg-darkblue-600 rounded-8 flex flex-row justify-center gap-45 items-center" 
          onClick={() => releaseTrack(true)} style={{textAlign: 'center', cursor: 'pointer'}}>
            <p>Release</p>
          </a> : 
          <a className="cursor-pointer fill-btn-second text-14 py-2 px-2 font-medium bg-coral-600 rounded-8 flex flex-row justify-center gap-45 items-center" 
          onClick={() => releaseTrack(false)}>Down</a>}</td>
        <td className="px-4 py-3 text-center items-center">
          <div className="flex justify-center items-center" onClick={() => playAudio()}>
            <Icon.ItemPlayIcon/>
          </div>
        </td>
      </tr>
    </>)
}

export default TrackItem;