import React, { useEffect, useRef, useState, useContext } from "react";
import * as Icon from "../../icons";
import { APIContext } from "../../context/ApiContext";
import { formatDuration, convertToDataURL, formatDate} from "../../utils/format";
import { Principal } from '@dfinity/principal'; 
import audioPlay from "../../utils/AudioPlay";
import { useDispatch } from "../../store";
import { hideAudioPlay } from "../../store/reducers/player";
import { Menu } from '@headlessui/react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "../../store";
import { BASE_URL } from '../../config';
import loading from "../../utils/Loading";
import alert from "../../utils/Alert";
import { encodeToBase64 } from "../../utils/format";

function NewTrackItem({trackItem, index, play, isNew}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const {user} = useSelector((state) => (state.auth));
    const { addToFavouriteAPI } = useContext(APIContext);

    const playAudio = async () => {
     
      dispatch(hideAudioPlay());
      
      play(index)
    }

    const addToFavourite = async () => {
      if(!user.isInitialized) {
        alert("warning", "Please login first");
        return;
      }

      loading();

      const data = await addToFavouriteAPI(user.principal, trackItem.contentId);

      alert("info", data.msg);

      loading(false);
    } 

    const followArtist = async () => {
      if(!user.isInitialized) {
        alert("warning", "Please login first");
        return;
      }

      if(user.principal == trackItem.artist) {
        alert("warning", "Can't follow the yourself");
        return;
      }

      if(isNew)
        history.push('artist/id=' + encodeToBase64(trackItem.artist));
      else
        history.push('../artist/id=' + encodeToBase64(trackItem.artist));
    }

    return (<>
     <tr style={{color: "white"}} className="z-0 font-normal border-b bg-transparent border-gray-700 cursor-pointer hover:bg-primary-800 transition-all duration-200 ease-in-out dark" >
      <td className="px-4 py-3 text-center group-hover:text-darkblue-500"
         style={{ maxWidth: '200px'}}>
          <div className="flex justify-start items-center flex-row pl-4 gap-[30px]" >
            <img className="rounded-2 w-[60px] h-[60px]" src={`${BASE_URL}/` + trackItem.thumbnail}/>
            <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{trackItem.title}</p>
          </div>
        </td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500">{trackItem.artists.displayname}</td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500">{trackItem.cover}</td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500">{Number(trackItem.playCount)}</td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500">{Number(trackItem.saved)}</td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500">{formatDuration(Number(trackItem.duration))}</td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500"><div className="min-w-[100px]">{formatDate(Number(trackItem.createdAt) / 1000)}</div></td>
        <td className="px-4 py-3 text-center">
          <div className="flex justify-center items-center" onClick={() => playAudio()}>
            <Icon.ItemPlayIcon/>
          </div>
        </td>
        <td className="px-4 py-3 text-center">
          <Menu as="div" className="inline-block text-left">
              <div>
                <Menu.Button className="group">
                  <Icon.OptionIcon/>
                </Menu.Button>
              </div>
              <Menu.Items 
                  className="absolute right-0 mt-1 mr-4 w-64 origin-top-right bg-secondary-700 divide-y bg-opacity-95 divide-gray-100 rounded-lg text-white shadow-bottom_1 transition-all duration-200 ease-in-out" >
                  <div className="py-2 px-45 flex flex-col gap-[10px]">
                    <Menu.Item>
                      {({ active }) => (
                        <div className="menu-item flex justify-row items-center flex start px-45 gap-[10px] rounded-2 cursor-pointer hover:bg-primary-800" onClick={() => addToFavourite()}>
                          <Icon.FavoriteIcon/>
                          <a
                            className="block py-2 font-plus font-bold text-14 leading-[19px]"
                          >
                            Add To Favorites
                          </a>
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <div className="menu-item flex justify-row items-center flex start px-45 gap-[10px] rounded-2 cursor-pointer hover:bg-primary-800" onClick={() => followArtist()}>
                          <Icon.FollowIcon/>
                          <a
                            className="block py-2 font-plus font-bold text-14 leading-[19px]"
                          >
                            Follow Artist
                          </a>
                        </div>
                      )}
                    </Menu.Item>
                  </div>
              </Menu.Items>
          </Menu>
        </td>
      </tr>
    </>)
}

export default NewTrackItem;