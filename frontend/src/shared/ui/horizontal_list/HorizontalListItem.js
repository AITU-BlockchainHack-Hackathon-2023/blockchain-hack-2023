import React from "react";
import styles from "./horizontalList.module.css";

export default function HorizontalListItem({children, isShowAll=false}) {
    return (<>
        <div className={`${isShowAll && styles["HorizontalList-item--show-all"]} ${styles["HorizontalList-item"]}`}>
            {children}
        </div >
    </>)
}