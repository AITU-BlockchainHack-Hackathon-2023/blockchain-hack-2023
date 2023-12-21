import React from 'react';

import styles from './block.module.css'

export default function Block({children, isRightCenter=false, top, bottom, left, right, isAlignCenter, width, maxWidth, isWrapper=false, padding, isCenteredByY=false}){

    const style = {
        maxWidth,
        width,
        marginTop: top,
        marginBottom: bottom,
        marginLeft: left,
        marginRight: right,
        padding
    }

    return (
        <div style={style} className={`
            ${styles['block']}
            ${isAlignCenter && styles['block--center']} 
            ${isWrapper && styles['block--wrapper']}
            ${isCenteredByY && styles['block--centerY']}
            ${isRightCenter && styles['block--isRightCenter']}
        `}>
            {children}
        </div>
    );
}

