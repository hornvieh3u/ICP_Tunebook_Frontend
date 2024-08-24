import React, { useEffect, useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from "../../store";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TrackCard from "../Track/TrackCard";
import { APIContext } from "../../context/ApiContext";

export default function TrackSlide() {
  const slideRef = useRef(null);
  const [ trackList, setTrackList] = useState(new Array(12).fill(null)); 
  const { getAllReleasedTracks } = useContext(APIContext);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(16);
  const [sort, setSort] = useState(true);
  const [sortby, setSortby] = useState('playCount');
  const [searchWord, setSearchWord] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const handleScrollLeft = () => {
    slideRef.current.scrollBy(
      { left: -200, behavior: 'smooth' }
    )
  }

  const getPopularTracks = async ()=> {
    const {data, count} = await getAllReleasedTracks(searchWord, page, pageSize, sort, sortby);
    let tracks = [];

    if(data != null) {
      if(data.length < 10) {
        console.log(data)
        for(let i = 0; i < 10; i++)  {
          tracks.push(data[i % (data.length)])
        }
      } else {
        tracks = data;
      }

      if(tracks != null) {
        setTrackList(tracks)
      }
    }

    setIsLoaded(true)
  }

  const handleScrollRight = () => {
    slideRef.current.scrollBy(
      { left: 200, behavior: 'smooth' }
    )
  }
  
  useEffect(() => {
    getPopularTracks();
  }, [])

  return (
    <div className="font-plus flex flex-col text-white relative">
      <div className="absolute flex flex-row justify-start items-end z-index-1">
        <p className="text-24 font-normal leading-30 font-plus">Popular Tracks</p>
        <img className="px-3" src="/demo/assets/right_arrow.svg"></img>
      </div>
      <div ref={slideRef}  className="flex flex-row relative overflow-x-auto z-index-100 mx-[10px]">
        <ul className="flex w-full justify-start items-start space-x-4 stories pt-[58px] pb-[10px]">
          {trackList.map((item, index) => { 
            return ((
              <li key={index}>
                <div className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}>
                  <TrackCard trackItem={item}/> 
                </div>
              </li>
              // <PopularTrackItem trackItem={item} getTracks = {getTracks} play={play} index={index} key={index}/>
            )) } )}
        </ul>          
      </div>
      <div className="group" style={{position:"absolute", width:"34px", height:"34px", top:"118px", zIndex:"20", right:"-5px", cursor:"pointer", pointerEvents: 'auto'}} onClick={() => handleScrollRight()}>
        <img style={{transition:".3s all ease-out"}} className="opacity-100 group-hover:opacity-0 absolute right-0 top-0 rounded-full" src="/demo/assets/banner_left.svg"></img>
        <img style={{transition:".3s all ease-out"}} className="opacity-0 group-hover:opacity-100 absolute right-0 top-0 rounded-full" src="/demo/assets/banner_left_hover.svg"></img>
      </div>
      <div className="group" style={{position:"absolute", width:"34px", height:"34px", top:"118px", zIndex:"20", left:"-5px", cursor:"pointer", pointerEvents: 'auto'}} onClick={() => handleScrollLeft()}>
        <img style={{transition:".3s all ease-out"}} className="opacity-100 group-hover:opacity-0 absolute right-0 top-0 rounded-full" src="/demo/assets/banner_right.svg"></img>
        <img style={{transition:".3s all ease-out"}} className="opacity-0 group-hover:opacity-100 absolute right-0 top-0 rounded-full transform rotate-180" src="/demo/assets/banner_left_hover.svg"></img>
      </div>
    </div>
  );
}
