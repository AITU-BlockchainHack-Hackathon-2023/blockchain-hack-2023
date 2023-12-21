import React, { useEffect, useState } from 'react';

import styles from './button.module.css'

export default function Button({children, isBgLight=false, type='button', variant='main', size='', disabled=false, top, bottom, badge=false, onClick=f=>f, width}){

    const style = {
        width,
        marginTop: top,
        marginBottom: bottom,
    }

    const [btnVariant, setBtnVariant] = useState('main')


    // TODO добавить стиль circle
    // присваивать динамически, как в том шортсе из ютуба когда я сидел в лУне
    useEffect(()=> {
        switch(variant){
            case('second'):
                setBtnVariant('second');
                break;
            case('control'):
                setBtnVariant('control');
                break;
            case('outline'):
                setBtnVariant('outline');
                break;
            case('outline-white'):
                setBtnVariant('outline-white');
                break;
            case('outline-inverse'):
                setBtnVariant('outline-inverse');
                break;
            case('landing'):
                setBtnVariant('landing');
                break;
            case('cancel'):
                setBtnVariant('cancel');
                break;
            case('yellow'):
                setBtnVariant('yellow');
                break;
            default:
                setBtnVariant('main');
                break;
        }

    }, [variant])

    return (
        <button
            className={`
                ${styles.btn} ${
                    // variant === 'main' ? styles['btn-main'] : 
                    styles['btn--'+btnVariant]}
                ${styles['btn--'+ size] }
                ${badge ? styles['btn--badge'] : ''}
                ${isBgLight && styles['btn--bglight']}
                ${disabled && styles['btn--disabled']}
            `}
            disabled={disabled}
            onClick={onClick}
            type={type}
            style={style}
        >
            {children}
        </button>
    );
}

