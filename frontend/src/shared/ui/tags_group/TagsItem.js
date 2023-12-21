import React from "react";

import styles from './TagsGroup.module.css'
export default function TagsItem({label=''}) {

    return (<>
        <div className={`
                ${styles['TagsGroup__item']}
            `}
        >
            {label}
        </div>
    </>)
}