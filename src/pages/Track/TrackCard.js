import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BASE_URL } from '../../config';
import { useEffect, useState } from "react";


export default function TrackCard({trackItem}) {
    const history = useHistory();

    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        setImageUrl(`${BASE_URL}/` + trackItem?.thumbnail)
    }, [trackItem])

    return (
        <div
            className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`} style={{paddingBottom: '25px'}}
        >
            <div className="banner-item shadow-sm rounded-lg group flex flex-col justify-end items-center p-2" style={{
                width: '144px',
                height: '144px',
                backgroundImage: `url(${imageUrl}`,
                backgroundRepeat: "no-repat",
                backgroundSize: "cover",
                backgroundBlendMode: "multiply",
                }}> 
            <div className="banner-img w-[54px] h-[54px] group rounded-full z-index-10 flex items-center justify-center relative opacity-0 group-hover:opacity-100 duration-300 group-hover:-translate-y-[160px] duration-400"
                style={{bottom: "-50px", left: "45px"}} onClick={() => history.push("/app/track/id=" + trackItem?.contentId)}>
                <div className="extend-play absolute bg-darkblue-500 bg-opacity-80 w-full h-full opacity-0 hover:shadow-bottom_1 rounded-full w-[54px] h-[54px] ">
                <img src="/demo/assets/expand_play.svg" className="rounded-full"/>
                </div>
                <img src="/demo/assets/banner_play.svg" className="w-[47px] h-[47px] opacity-100 banner-play absolute w-full h-full rounded-full"/>
            </div>
            </div>
            <div className="flex justify-center items-center w-[144px] pt-1">
            <p className="text-14 font-plus font-bold leading-18" style={{textAlign: "center"}}>{trackItem?.title}</p>
            </div>
        </div>     
    );
}