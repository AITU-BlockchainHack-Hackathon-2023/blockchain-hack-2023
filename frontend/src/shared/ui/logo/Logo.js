import React from 'react';

import styles from './logo.module.css' ;
import {useNavigate} from "react-router-dom";

export default function Logo(){

    const navigate = useNavigate();

    return (
        <div className={styles.logo}
             onClick={e => navigate("/")}
        >
            <a href="/">KORESHA</a>
        </div>


    );
}

