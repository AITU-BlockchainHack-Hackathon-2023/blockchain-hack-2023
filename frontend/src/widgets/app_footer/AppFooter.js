import React from "react";

import styles from './appFooter.module.css'
export default function AppFooter() {
    return (
        <footer className={styles['appFooter']}>
            <div  className={styles['appFooter__text']}>2023. Koresha Team <a className={styles.appFooter__link} href="https://t.me/kavelpim123">@levaP</a>, <a className={styles.appFooter__link} href="https://t.me/mitxp">@mitxp</a></div>
        </footer>
    )
}
