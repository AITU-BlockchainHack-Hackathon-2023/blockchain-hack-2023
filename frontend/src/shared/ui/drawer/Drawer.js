import React, {useEffect, useState} from 'react'

import styles from './Drawer.module.css'
import CloseIcon from "../../assets/icons/close.svg";
import Button from "../button/Button";
import Container from "../box/Container";
import BooksCounter from "../../../widgets/books_counter/BooksCounter";

export default function Drawer({title, onClose=f=>f, children, isDrawerActive=false, Buttons}){

    const containerHeight = window.innerHeight;

    const [isExtended, setIsExtended] = useState(false);
    const [drawerStatus, setDrawerStatus] = useState('medium-extend')
    const [startY, setStartY] = useState(null);
    const [currentY, setCurrentY] = useState(null);
    // const [drawerHeight, setDrawerHeight] = useState(containerHeight*0.2); // Начальная высота панели
    //
    // // Ограничиваем минимальную и максимальную высоту панели в процентах
    // const minHeight = containerHeight * 0.2;
    // const maxHeight = containerHeight * 0.8;

    const scrollableComponent = document.getElementById('fullPageContainer')

    const toggleDrawer = () => {
        setIsExtended(!isExtended);
    };

    const handleTouchStart = (event) => {
        // console.log('TOOOUCH DRAWER HEADER')
        // scrollableComponent.style.overflowY = 'hidden';
        // event.preventDefault(); // Предотвращаем прокрутку страницы
        setStartY(event.touches[0].clientY);
        setCurrentY(event.touches[0].clientY);
        // event.preventDefault(); // Предотвращаем прокрутку страницы

    };

    const handleTouchMove = (event) => {
        // event.preventDefault(); // Предотвращаем прокрутку страницы
        setCurrentY(event.touches[0].clientY);
        // if (startY) {
        //     const deltaY = event.touches[0].clientY - startY;
        //     const newHeight = drawerHeight - deltaY;
        //     // const newHeight = drawerHeight - (deltaY / containerHeight) * 100;
        //
        //     if (newHeight >= minHeight && newHeight <= maxHeight) {
        //         setDrawerHeight(newHeight);
        //     }
        //
        //     setCurrentY(event.touches[0].clientY);
        // }
        // scrollableComponent.style.overflowY = 'auto';

    };

    const handleTouchEnd = () => {
        if (startY && currentY) {
            const deltaY = currentY - startY;
            if (deltaY < -20) {
                // setDrawerStatus('full-extend')
                toggleDrawer(); // Раскрываем панель при свайпе вверх
            } else if (deltaY > 20) {
                if (!isExtended) {
                // if (drawerStatus === 'medium-extend') {
                    // setDrawerStatus('hidden')
                    // onClose(false)
                    return
                }
                // setDrawerStatus('medium-extend')
                toggleDrawer(); // Закрываем панель при свайпе вниз
            }
        }
        setStartY(null);
        setCurrentY(null);
        // scrollableComponent.style.overflowY = 'auto';
    };

    // useEffect(() => {
    //     if (isExtended) {
    //         setDrawerHeight(drawerHeight * 0.8)
    //     } else {
    //         setDrawerHeight(drawerHeight * 0.2)
    //     }
    // }, [isExtended]);

    // const [extended, setExtended] = useState(true);

    // useEffect(() => {
    //
    // }, [drawerHeight]);

    // const drawerStyle = {
    //     height: `${drawerHeight}px`,
    // };

    //${drawerStatus === 'medium-extend' && isDrawerActive && styles['Drawer--medium-extend']}

    return (
        <div className={`${styles.Drawer} 
                ${isExtended && styles['Drawer--extended']}
            `}
        >
            <div className={styles.Drawer__buttons}>
                {Buttons}
                {/*<Button width={'100%'} variant={'outline'} onClick={() => setIsDrawerActive(!isDrawerActive)}>Подробнее</Button>*/}
            </div>
            <div className={styles.Drawer__wrapper}>
                <div className={styles.Drawer__header}
                     onTouchStart={handleTouchStart}
                     onTouchMove={handleTouchMove}
                     onTouchEnd={handleTouchEnd}
                >
                    <span className={styles.Drawer__line}></span>
                </div>
                <div className={styles.Drawer__content}>
                    {children}
                </div>
            </div>
        </div>
    );
}