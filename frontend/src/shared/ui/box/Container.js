import React from 'react';

import styles from './box.module.css'

export default function Container({children, variant='', padding, isWrapper, zIndex, scrollable=false}){

    const style = {
        padding,
        // zIndex,
    }
    return (
        <div id={'scroll-container'} className={`${styles.container} ${isWrapper && styles['container--wrapper']} ${styles['container--scrollable']} `} style={style}>
            {/*<div className={styles.container}>*/}
            {children}
            {/*</div>*/}
        </div>
    );
}

