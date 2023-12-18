import React from "react";

import styles from './tabchip.module.css'
export default function TabChip({active, text, onClick=f=>f}) {

    return (<>
        <div className={`
                ${styles['TabChip']}
                ${active && styles['TabChip--active']}
            `}
             onClick={onClick}
        >
            {text}
        </div>
    </>)
}