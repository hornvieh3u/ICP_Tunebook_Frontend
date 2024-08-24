import React, {useState, useEffect} from "react";
import "./Loader.css";
import CircularSpinner from "../Animated/CircularSpinner";

export default function PageLoader() {
   return (
    <div className="page-spinner-container">
      <div className="flex justify-center items-center">        
        <CircularSpinner/>
        <div className="absolute items-center flex justify-center flex-col">
          <img src="/logo.svg" style={{width: '48px', height: '54px'}}></img>
        </div>
      </div>
    </div>
  );
}
