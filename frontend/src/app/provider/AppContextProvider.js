import React, { createContext, useContext, useState } from 'react';
import useAdaptive from "./hooks/useAdaptive";
import useRoom from "./hooks/useRoom";
import useAuth from "./hooks/useAuth";

const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export function AppContextProvider({ children }) {

    const adaptiveHandler = useAdaptive();

    const authHandler = useAuth();

    return (
        <AppContext.Provider
            value={{
                adaptiveHandler,
                authHandler
            }
        }>
            {children}
        </AppContext.Provider>
    );
}
