import React from "react";

import styles from './TagsGroup.module.css'
export default function TagsGroup({children}) {

    return (<>
        <div className={`
                ${styles['TagsGroup']}
            `}
        >
            {children}
        </div>
    </>)
}