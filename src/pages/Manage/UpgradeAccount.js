import React, { useEffect, useRef, useState, useContext } from "react";
import { APIContext } from "../../context/ApiContext";
import { useSelector } from "../../store";
import audioPlay from "../../utils/AudioPlay";

function UpgradeAccount() {
    const [ mySongList, setMySongList] = useState([]); 
    const { getTracksByArtist } = useContext(APIContext);

    return (<>
    <div className="flex flex-row justify-start items-end pt-[20px] mb-[150px]">
      <div className="w-full">
        <div className="overflow-x-auto  x-scrollable-tag mt-4">
        </div>
      </div>
    </div>
    </>)
}

export default UpgradeAccount;