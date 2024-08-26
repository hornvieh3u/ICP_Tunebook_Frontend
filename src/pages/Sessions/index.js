import React, { useState, useEffect } from "react";
import { dispatch, useDispatch, useSelector } from "../../store/index.js";
import { SetTitle } from '../../store/reducers/auth.js';

function Sessions() {

    useEffect(() => {
        dispatch(SetTitle('Sessions'));
    }, [])

    return (
        <>
            Sessions
        </>
    )
}

export default Sessions;