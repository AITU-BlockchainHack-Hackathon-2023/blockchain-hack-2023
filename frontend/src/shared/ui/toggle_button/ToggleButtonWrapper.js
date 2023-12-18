import React, {useState} from "react";

import styles from './toggleButton.module.css'
export default function ToggleButtonWrapper({children}) {

    return (
        <div className={styles['toggleButton-wrapper']}>
            {children}
        </div>
    )
}