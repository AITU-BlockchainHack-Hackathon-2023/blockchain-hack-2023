import React, {useLayoutEffect, useState} from "react";

export default function useTheme() {
    // const [theme, setTheme] = useState(localStorage.getItem('app-theme') || 'light');
    const [theme, setTheme] = useState('light');

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('app-theme', theme)
    }, [theme])

    return {theme, setTheme}
}