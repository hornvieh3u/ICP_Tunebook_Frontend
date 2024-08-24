import React, {useState, useEffect} from "react";
import "./Loader.css";
import CircularSpinner from "../Animated/CircularSpinner";
import { useDispatch, useSelector } from "../../store";

const LoadingOverlay = () => {
  const load = useSelector((state) => state.load);
  const { open } = load;
  
  return (
    <>
      {open && (
        <div className="overlay">
        <div className="flex justify-center items-center">        
          <CircularSpinner/>
          <div className="absolute items-center flex justify-center flex-col">
            <img src="/logo.svg" style={{width: '96px', height: '96px'}}></img>
          </div>
        </div>
      </div>
      )}
    </>
  );
}

export default LoadingOverlay;