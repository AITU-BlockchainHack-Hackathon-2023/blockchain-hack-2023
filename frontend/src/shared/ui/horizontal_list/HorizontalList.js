import React, {useEffect, useRef, useState} from "react";

import styles from './horizontalList.module.css';
import ForwardIcon from '../../assets/icons/arrow_forward_ios_FILL0_wght400_GRAD0_opsz48.svg'
import BackIcon from '../../assets/icons/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg'
import HorizontalListItem from "./HorizontalListItem";
import CardShowAll from "../card_show_all/CardShowAll";
export default function HorizontalList({children, title='', description, limit, isShowAllBtn, bottom}) {

    const style = {
        marginBottom: bottom
    }
    const divRef = useRef(null); // Reference to the div element
    const btnNextRef = useRef(null);
    const btnPrevRef = useRef(null);
    const [isScrolledByX, setIsScrolledByX] = useState(false);
    const [isScrolledByXDone, setIsScrolledByXDone] = useState(false);

    const [scrollAmount, setScrollAmount] = useState(null)
    useEffect(()=> {
        const eventCardElement = document.querySelector('div[data-id="event-card"]');
        if (eventCardElement) {
            const width = eventCardElement.offsetWidth;
            setScrollAmount(width*3)
        }
    })

    const handleScroll = () => {
        if (divRef.current.scrollLeft > 0) {
            setIsScrolledByX(true)
        } else {
            setIsScrolledByX(false)
        }

        if (Math.round(divRef.current.scrollLeft + divRef.current.clientWidth + 1) >= divRef.current.scrollWidth) {
            setIsScrolledByXDone(true)
        } else {
            setIsScrolledByXDone(false)
        }

        // console.log('scrollWidth',divRef.current.scrollWidth)
        // console.log('clientWidth',divRef.current.clientWidth)
        // console.log('scrollLeft',divRef.current.scrollLeft)
        // console.log('scrollLeft + clientWidth',divRef.current.scrollLeft + divRef.current.clientWidth)
        // console.log('round',Math.round(divRef.current.scrollLeft + divRef.current.clientWidth))
    };

    function handleClickNext() {
        const divElement = divRef.current;
        if (divElement) {
            divElement.scrollLeft += scrollAmount;
        }
    };
    function handleClickPrev() {
        const divElement = divRef.current;
        if (divElement) {
            divElement.scrollLeft -= scrollAmount;
        }
    };

    return (<>
        <div className={styles['HorizontalList']} style={style}>
            <div className={styles["HorizontalList__header"]}>
                {title && <div className={styles["HorizontalList__title"]}>{title}</div>}
                {description && <div className={styles["HorizontalList__description"]}>{description}</div>}
            </div>
            <div ref={divRef} onScroll={handleScroll} className={styles["HorizontalList__items"]}>
                {children}
                {isShowAllBtn && <HorizontalListItem isShowAll={true}>
                    <CardShowAll onClick={f=>f}/>
                </HorizontalListItem>}

            </div>
            <button ref={btnPrevRef} className={`${ !isScrolledByX && styles['HorizontalList-button--hidden']} ${styles['HorizontalList-button']} ${styles['HorizontalList-button--prev']}`} onClick={handleClickPrev}>
                <BackIcon width={24} height={24} />
            </button>
            <button ref={btnNextRef} className={`${isScrolledByXDone && styles['HorizontalList-button--hidden']} ${styles['HorizontalList-button']} ${styles['HorizontalList-button--next']}`} onClick={handleClickNext}>
                <ForwardIcon width={24} height={24} />
            </button>
        </div>
    </>)
}