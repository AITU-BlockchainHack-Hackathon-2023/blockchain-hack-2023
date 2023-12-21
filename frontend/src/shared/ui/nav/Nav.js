import React from 'react';

import styles from './nav.module.css'
export default function Nav({children, top, left, right, block, isMobile=false}){

    const style = {
        marginTop: top,
        marginRight: right,
        marginLeft: left,
    }

    return (
        <nav style={style}
             className={`
                ${styles['nav']}
                ${isMobile && styles['nav--mobile']}
             `}
        >
            <ul className={`
                ${styles['nav-ul']}
                ${block && styles['nav--block']}
            `}>
                {children}
            </ul>
        </nav>
    );
}

