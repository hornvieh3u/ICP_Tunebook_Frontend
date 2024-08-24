import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "../../store";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TrackCard from "./TrackCard";

export default function Tracks() {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className="flex flex-col pt-16 font-plus pl-6 pr-6 text-white relative overflow-x-auto">
        <div className="font-plus flex flex-col text-white relative">
            <div className="absolute flex flex-row justify-start items-end z-index-1">
                <p className="text-24 font-normal leading-30 font-plus">Genres</p>
            </div>
            <div className="flex flex-wrap mb-8 gap-2 md:gap-4 items-start justify-evenly z-index-100 md:px-[10px] py-[58px]">
                <TrackCard url={'url("/demo/assets/classic_rock.png")'} name={'Classic rock'}/> 
                <TrackCard url={'url("/demo/assets/zazz.png")'} name={'Zazz'}/> 
                <TrackCard url={'url("/demo/assets/dubstep.png")'} name={'DubStep'}/> 
                <TrackCard url={'url("/demo/assets/rhythm.png")'} name={'Rhythm and Blues o R&B'}/> 
                <TrackCard url={'url("/demo/assets/techno.png")'} name={'Techno'}/> 
                <TrackCard url={'url("/demo/assets/classic_rock.png")'} name={'Classic rock'}/> 
                <TrackCard url={'url("/demo/assets/zazz.png")'} name={'Zazz'}/> 
                <TrackCard url={'url("/demo/assets/dubstep.png")'} name={'DubStep'}/> 
                <TrackCard url={'url("/demo/assets/rhythm.png")'} name={'Rhythm and Blues o R&B'}/> 
                <TrackCard url={'url("/demo/assets/techno.png")'} name={'Techno'}/> 
                <TrackCard url={'url("/demo/assets/classic_rock.png")'} name={'Classic rock'}/> 
                <TrackCard url={'url("/demo/assets/zazz.png")'} name={'Zazz'}/> 
                <TrackCard url={'url("/demo/assets/dubstep.png")'} name={'DubStep'}/> 
                <TrackCard url={'url("/demo/assets/rhythm.png")'} name={'Rhythm and Blues o R&B'}/> 
                <TrackCard url={'url("/demo/assets/techno.png")'} name={'Techno'}/> 
                <TrackCard url={'url("/demo/assets/classic_rock.png")'} name={'Classic rock'}/> 
                <TrackCard url={'url("/demo/assets/zazz.png")'} name={'Zazz'}/> 
                <TrackCard url={'url("/demo/assets/dubstep.png")'} name={'DubStep'}/> 
                <TrackCard url={'url("/demo/assets/rhythm.png")'} name={'Rhythm and Blues o R&B'}/> 
                <TrackCard url={'url("/demo/assets/techno.png")'} name={'Techno'}/> 
                <TrackCard url={'url("/demo/assets/classic_rock.png")'} name={'Classic rock'}/> 
                <TrackCard url={'url("/demo/assets/zazz.png")'} name={'Zazz'}/> 
                <TrackCard url={'url("/demo/assets/dubstep.png")'} name={'DubStep'}/> 
                <TrackCard url={'url("/demo/assets/rhythm.png")'} name={'Rhythm and Blues o R&B'}/> 
                <TrackCard url={'url("/demo/assets/techno.png")'} name={'Techno'}/> 
                <TrackCard url={'url("/demo/assets/classic_rock.png")'} name={'Classic rock'}/> 
                <TrackCard url={'url("/demo/assets/zazz.png")'} name={'Zazz'}/> 
                <TrackCard url={'url("/demo/assets/dubstep.png")'} name={'DubStep'}/> 
                <TrackCard url={'url("/demo/assets/rhythm.png")'} name={'Rhythm and Blues o R&B'}/> 
                <TrackCard url={'url("/demo/assets/techno.png")'} name={'Techno'}/> 
                <TrackCard url={'url("/demo/assets/classic_rock.png")'} name={'Classic rock'}/> 
                <TrackCard url={'url("/demo/assets/zazz.png")'} name={'Zazz'}/> 
                <TrackCard url={'url("/demo/assets/dubstep.png")'} name={'DubStep'}/> 
                <TrackCard url={'url("/demo/assets/rhythm.png")'} name={'Rhythm and Blues o R&B'}/> 
                <TrackCard url={'url("/demo/assets/techno.png")'} name={'Techno'}/> 
            </div>
        </div>
    </div>
  );
}
