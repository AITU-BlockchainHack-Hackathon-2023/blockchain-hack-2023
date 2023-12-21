import React from "react";
import useTheme from "../shared/libs/hooks/useTheme";
import {Router} from "./router/Router";
import AppContainer from "../pages/AppContainer";

export default function App() {

    const {theme, setTheme} = useTheme();

    return (<>
        <AppContainer>
            <Router />
        </AppContainer>
    </>)
}