import React, { useEffect, useRef, useState } from "react";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "../../store";
import PopularTracks from "./PopularTracks";
import { useParams } from "react-router-dom";
import TrackDetailBanner from "./TrackDetailBanner";

function TrackDetail() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  return (
    <>
      <TrackDetailBanner/>

      <PopularTracks/>
    </>
  );
}

export default TrackDetail;
