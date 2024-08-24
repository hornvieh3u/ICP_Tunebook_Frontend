import React, { useEffect, useState, useContext } from "react";
import { APIContext } from "../../context/ApiContext";
import audioPlay from "../../utils/AudioPlay";
import { useSelector } from "../../store";
import NewTrackItem from "./NewTrackItem";

function PopularTracks() {
    const [ trackList, setTrackList] = useState([]); 
    const { getAllReleasedTracks } = useContext(APIContext);
    const { songListUpdated } = useSelector((state) => state.auth);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(16);
    const [sort, setSort] = useState(true);
    const [sortby, setSortby] = useState('playCount');
    const [searchWord, setSearchWord] = useState('');

    const getTrackList = async () => {
      const {data, count} = await getAllReleasedTracks(searchWord, page, pageSize, sort, sortby);
      if(data != null) {
        setTrackList(data)
      }
    }
    
    useEffect(() => {
      getTrackList();
    }, [songListUpdated])

    const play = (index) => {
      audioPlay(trackList, index);
    }

    return (<>
    <div className="flex flex-row justify-start items-end font-plus px-6 pt-6">
        <p className="text-24 font-normal leading-30 font-plus">Popular Tracks</p>
        <img className="px-3" src="/demo/assets/right_arrow.svg"></img>
    </div>
    <div className="flex flex-row justify-start items-end pt-[20px] mb-[150px] font-plus px-[20px]">
      <div className="w-full">
        <div className="overflow-x-auto  x-scrollable-tag mt-4">
          <table className="w-full table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-800 min-w-[610px]">
            <thead className="border-b dark:border-gray-700 text-sm text-gray-700 bg-transparent dark:bg-primary" style={{color: "white"}}>
            <tr>
                <th scope="col" className="px-4 pb-5 text-start">
                  <p className="pl-4">
                    Title
                  </p>
                </th>
                <th scope="col" className="px-4 pb-5 text-center">
                    Writer
                </th>
                <th scope="col" className="px-4 pb-5 text-center">
                    Cover
                </th>
                <th scope="col" className="px-4 pb-5 text-center">
                  <div className="flex justify-center w-full items-center flex-row">
                      <img src="/demo/assets/eye_hidden.svg" className="min-w-[24px] min-h-[24px]"/>
                  </div>
                </th>
                <th scope="col" className="px-4 pb-5 text-center">
                  <div className="flex justify-center w-full items-center flex-row">
                      <img src="/demo/assets/star.svg" className="min-w-[24px] min-h-[24px]"/>
                  </div>
                </th>
                <th scope="col" className="px-4 pb-5 text-center">
                  <div className="flex justify-center w-full items-center flex-row">
                      <img src="/demo/assets/clock.svg" className="w-[24px] h-[24px]"/>
                  </div>
                </th>
                <th scope="col" className="px-4 pb-5 text-center">
                    CreatedAt
                </th>
                <th scope="col" className="px-4 pb-5 text-center">       
                    Play
                </th>
                <th scope="col" className="px-4 pb-5 text-center">
                           
                </th>
              </tr>
          </thead>
          <tbody>
              {trackList.map((item, index) => { 
                return ((
                  <NewTrackItem trackItem={item} play={play} index={index} isNew={false} key={index} />
              )) } )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>)
}

export default PopularTracks;