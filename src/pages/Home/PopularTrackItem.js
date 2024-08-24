import React, { useEffect, useState, useContext } from "react";
import * as Icon from "../../icons";
import { APIContext } from "../../context/ApiContext";
import { formatDuration, convertToDataURL, formatDate} from "../../utils/format";
import { Principal } from '@dfinity/principal'; 
import { useDispatch } from "../../store";
import { hideAudioPlay } from "../../store/reducers/player";
import { Menu } from '@headlessui/react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function PopularTrackItem({songItem, getSongList, index, play}) {
    const [ contentId, setContentId] = useState(''); 
    const [ title, setTitle] = useState(''); 
    const [ duration, setDuration] = useState(0); 
    const [ playCount, setPlayCount] = useState(0);
    const [ artistName, setArtistName ] = useState('');
    const [ createdAt, setCreatedAt] = useState(0);
    const [ contentCanisterId, setContentCanisterId] = useState("");
    const { getProfileInfo } = useContext(APIContext);
    const dispatch = useDispatch();
    const history = useHistory();

    const [thumbnailUrl, setThumbnailUrl] = useState('');

    const setThumbnail = async () => {
      const chunks = [];
      chunks.push(new Uint8Array(songItem[1].thumbnail.file).buffer);
  
      const blob = new Blob(chunks, {type : songItem[1].thumbnail.fileType ? songItem[1].thumbnail.fileType : "image/jpeg"});

      const thumbnailUrl = await convertToDataURL(blob);

      setThumbnailUrl(thumbnailUrl);    
    }

    const getArtist = async () => {
      getProfileInfo(songItem[1].userId).then(artistInfo => {
        setArtistName(artistInfo[0].displayName)
      })
    }

    const playAudio = async () => {
      let playUrl = "";
      
      dispatch(hideAudioPlay());
      
      play(index)
    }

    useEffect(() => {
      setContentId(songItem[1].contentId);
      setTitle(songItem[1].title);
      setDuration(songItem[1].duration);
      setPlayCount(songItem[1].playCount);
      setCreatedAt(formatDate(Number(songItem[1].createdAt) / 1000));
      setContentCanisterId(Principal.from(songItem[1].contentCanisterId).toText())
      setThumbnail();
      getArtist();
    }, [songItem])

    return (<>
     <tr style={{color: "white"}} className="z-0 font-normal border-b bg-transparent border-gray-700 cursor-pointer hover:bg-primary-800 transition-all duration-200 ease-in-out dark" >
      <td className="px-4 py-3 text-center group-hover:text-darkblue-500"
         style={{ maxWidth: '200px'}}>
          <div className="flex justify-start items-center flex-row pl-4 gap-[30px]" >
            <img className="rounded-2 w-[60px] h-[60px]" src={thumbnailUrl}/>
            <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</p>
          </div>
        </td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500">{artistName}</td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500">{Number(playCount)}</td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500">{formatDuration(Number(duration))}</td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500"><div className="min-w-[100px]">{createdAt}</div></td>
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
                        <div className="menu-item flex justify-row items-center flex start px-45 gap-[10px] rounded-2 cursor-pointer hover:bg-primary-800">
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
                        <div className="menu-item flex justify-row items-center flex start px-45 gap-[10px] rounded-2 cursor-pointer hover:bg-primary-800" onClick={() => history.push('artist/id=' + artistName)}>
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

export default PopularTrackItem;