import React from "react";

import styles from './toggleButton.module.css'
export default function ToggleButton({isActive=false, onClick= f=>f, children}) {


    return (
        <div className={`
            ${styles['toggleButton']} 
            ${isActive && styles['toggleButton--active']}
         `} onClick={onClick}>
            {children}
        </div>
    )
}