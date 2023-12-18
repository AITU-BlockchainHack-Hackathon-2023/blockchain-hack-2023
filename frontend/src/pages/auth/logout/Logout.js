import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import Logger from '../../../shared/libs/internal/Logger';
import {useAppContext} from "../../../app/provider/AppContextProvider";
const logger = new Logger('Logout');

export default function Logout(){

    const navigate = useNavigate();

    const { logout } = useAppContext();

    logger.log(logout());
    navigate('/');

    // return (<>
    //     <h1>[Logout page]</h1>
    //
    //     <button onClick={async e => {
    //         logger.log(await logout());
    //         navigate('/');
    //     }}>Logout</button>
    // </>);
}

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/