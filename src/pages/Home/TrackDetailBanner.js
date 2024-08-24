import React, { useEffect,  useState, useContext } from "react";
import { useSelector} from "../../store";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";
import { APIContext } from "../../context/ApiContext";
import loading from "../../utils/Loading";
import alert from "../../utils/Alert";
import audioPlay from "../../utils/AudioPlay";
import { useDispatch } from "../../store";
import { hideAudioPlay } from "../../store/reducers/player";

export default function TrackDetailBanner() {
  const history = useHistory();
  const { id } = useParams();
  const [trackInfo, setTrackInfo] = useState(null);
  const { getTrackInfoAPI, addToFavouriteAPI } = useContext(APIContext);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getTrackInfo = async (id) => {
    const { data }  = await getTrackInfoAPI(id);

    setTrackInfo(data[0]);
  }

  const addToFavourite = async () => {
    if(!user.isInitialized) {
      alert("warning", "Please login first");
      return;
    }

    loading();

    const data = await addToFavouriteAPI(user.principal, trackInfo.contentId);

    alert("info", data.msg);

    loading(false);
  } 

  const play = () => {
    let trackList = [];

    dispatch(hideAudioPlay());

    trackList.push(trackInfo)

    console.log("trackList", trackList)

    audioPlay(trackList, 0);
  }

  useEffect(() => {
    getTrackInfo(id)
  }, [id])

  // const follow

  return (
    <div className="font-plus flex flex-col text-white relative">
      <div
        className="flex flex-col justify-start"
        style={{ height: "300px", backgroundImage: 'url("/demo/assets/classic_rock_detail.png")',
              backgroundRepeat: "no-repat",
              backgroundSize: "cover",
              opacity: "95%",
              backgroundBlendMode: "multiply"}}>

        <div className="flex flex-row hidden lg:block justify-start absolute top-6 left-9 z-50">
            <img src="/demo/assets/back.svg" className="cursor-pointer" onClick={() => history.goBack()}></img>
        </div>
        <div className="flex flex-row justify-start gap-[33px] items-center absolute top-16 left-9 z-50">
            <div className="flex flex-col gap-[10px]">
                <h1 className="font-plus font-normal text-24 text-white leading-[30px]">{trackInfo?.title}</h1>
                {/* <h5 className="font-plus font-light text-sm text-white leading-[17px]">35M Monthly listeners</h5> */}
            </div>
        </div>
        <div className="absolute top-[185px] left-12 z-50 banner-img w-[54px] h-[54px] group rounded-full cursor-pointer flex items-center justify-center relative duration-500" onClick={() => play()}>
            <div className="extend-play absolute bg-darkblue-500 bg-opacity-80 w-full h-full opacity-0 hover:shadow-bottom_1 rounded-full w-[54px] h-[54px]">
                <img src="/demo/assets/expand_play.svg" className="rounded-full"/>
            </div>
            <img src="/demo/assets/banner_play.svg" className="w-[47px] h-[47px] opacity-100 banner-play absolute w-full h-full rounded-full"/>
        </div>
        {/* <div className="group" style={{position:"absolute", width:"40px", height:"40px", top:"165px", zIndex:"100", right:"102px", cursor:"pointer", pointerEvents: 'auto'}}>
            <img style={{transition:".3s all ease-out"}} className="opacity-100 group-hover:opacity-0 absolute right-0 top-0 rounded-full" src="/demo/assets/share.svg"></img>
            <img style={{transition:".3s all ease-out"}} className="opacity-0 group-hover:opacity-100 absolute right-0 top-0 rounded-full" src="/demo/assets/share_active.svg"></img>
        </div> */}
        <div className="group" onClick={() => addToFavourite()} style={{position:"absolute", width:"40px", height:"40px", top:"165px", zIndex:"100", right:"42px", cursor:"pointer", pointerEvents: 'auto'}}>
            <img style={{transition:".3s all ease-out"}} className="opacity-100 group-hover:opacity-0 absolute right-0 top-0 rounded-full" src="/demo/assets/add_star.svg"></img>
            <img style={{transition:".3s all ease-out"}} className="opacity-0 group-hover:opacity-100 absolute right-0 top-0 rounded-full" src="/demo/assets/add_star_active.svg"></img>
        </div>
        <div className="absolute bottom-0 left-0 w-full" style={{ height:"157px", background: "linear-gradient(180deg, rgba(26, 26, 33, 0) 57.04%, #1A1A21 99.15%)"}}>
        </div>
        <div className="absolute top-0 left-0 w-full" style={{ height:"300px", background: "linear-gradient(180deg, rgba(0, 0, 0, 0.8) 16.48%, rgba(0, 0, 0, 0) 58.93%)"}}>
        </div>
      </div>
    </div>
  );
}
