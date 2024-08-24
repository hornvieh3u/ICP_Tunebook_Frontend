import React, { useEffect, useRef, useState } from "react";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "../../store";

function Home() {
  return (
    <>
      <div className="flex flex-col pt-16 font-plus px-10 text-white relative overflow-x-auto">
          {/* <TrackSide/>
          <PopularTracks/> */}
      </div>
    </>
  );
}

export default Home;
