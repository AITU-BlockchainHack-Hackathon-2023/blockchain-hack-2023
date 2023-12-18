import React, {useContext, useEffect, useState} from "react";
import Authentication from "../pages/auth/main/Authentication";
import Loader from "../shared/ui/loader/Loader";
import AppContainer from "../pages/AppContainer";
import {useAppContext} from "../app/provider/AppContextProvider";
import Overlay from "../shared/ui/overlay/Overlay";

export default function PageNew({children}) {

    const {authHandler} = useAppContext()
    const {user, isLoading,setLoading, isAuth, checkAuth} = authHandler

    useEffect(() => {
        // if (user == null) {
            if(localStorage.getItem('token')) {
                checkAuth()
                // console.log(user)
            } else {
                setLoading(false)
            }

        // }
        // console.log(user)
        // console.log(isAuth)

    }, []);

    if (isLoading) {
        return (<Overlay><Loader /></Overlay>)
    }
    // else if (!isAuth) {
    //     return (<Authentication />)
    // }
    else {
        return (<>
            {/*{(isAuth && !user.name) && <SetNameModal />}*/}
            {children}
        </>)
    }




}