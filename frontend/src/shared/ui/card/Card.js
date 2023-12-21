import React from 'react';

import styles from './card.module.css'

export default function Card({children, variant='standard', top, bottom, maxWidth, forAuth, minWidth}){

    const style = {
        minWidth,
        maxWidth,
        marginTop: top,
        marginBottom: bottom,
    }

    return (
        <div className={`${styles.card} ${variant === 'standard' ? '' : styles['card--info'] } ${forAuth && styles['card--forauth']}`} style={style}>
            {children}
        </div>
    );
}

