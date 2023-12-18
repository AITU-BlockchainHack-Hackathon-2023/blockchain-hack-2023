import React from 'react';

import styles from './logo.module.css' ;
import {useNavigate} from "react-router-dom";

export default function Logo(){

    const navigate = useNavigate();

    return (
        <div className={styles.logo}
             onClick={e => navigate("/")}
        >
            {/*<LogoIcon width={45} height={45} />*/}
            <a href="/">LOGO</a>
            {/*LOGO*/}
        </div>


    );
}

