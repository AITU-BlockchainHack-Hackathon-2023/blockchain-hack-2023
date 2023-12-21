import React, { createContext, useContext, useState } from 'react';
import useAdaptive from "../../shared/libs/hooks/useAdaptive";
import useAddress from "./hooks/useAddress";

const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export function AppContextProvider({ children }) {

    const adaptiveHandler = useAdaptive();
    const addressHandler = useAddress();

    return (
        <AppContext.Provider
            value={{
                adaptiveHandler,
                addressHandler
            }
        }>
            {children}
        </AppContext.Provider>
    );
}
