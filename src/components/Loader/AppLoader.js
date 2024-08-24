import React, {useState, useEffect} from "react";
import "./Loader.css";
import CircularSpinner from "../Animated/CircularSpinner";

export default function AppLoader({isPercentage = true}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;

    if(isPercentage) {  
      interval = setInterval(() => {
        if (progress < 100) {
          setProgress(prevProgress => prevProgress + 1);
        } else {
          clearInterval(interval);
        }
      }, 18); // Adjust the interval as needed for the desired speed of progress
    }
    return () => {
      clearInterval(interval);
    };
  }, [progress]);

  return (
    <div className="spinner-container">
      <div className="flex justify-center items-center">        
        {/* <CircularSpinner/> */}
        <div className="absolute items-center flex justify-center flex-col">
          {/* <img src="/logo.svg" style={{width: '48px', height: '54px'}}></img>
          {isPercentage? (<span style={{fontFamily: "Plus Jakarta Sans", fontWeight:700, fontSize:"16px", lineHeight: "20px"}} className="mt-2 text-white">{progress}%</span>) : ("") } */}
        </div>
      </div>
    </div>
  );
}
