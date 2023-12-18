import React from "react";
import AdminPage from "../pages/manager/AdminAllInOne";
import {useAppContext} from "../app/provider/AppContextProvider";
import {useNavigate} from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";

export default function PageAdmin({children}) {

    const navigate = useNavigate();
    const {user, isLoading,setLoading, isAuth, checkAuth} = useAppContext()

    if (isAuth && user?.role === 'ADMIN') {

        return(<>
            {children}
        </>)
    }

    return <NotFoundPage />
}