import React from "react";
import MainPage from "../../pages/MainPage";
import NotFoundPage from "../../pages/NotFoundPage";

export const AppRoutes = Object.freeze({
    MAIN: 'main',
    NOT_FOUND: 'not_found',
})

export const RoutePath = Object.freeze({
    [AppRoutes.MAIN]: '/',
    [AppRoutes.NOT_FOUND]: '*',
})

export const routeConfig = Object.freeze({
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />
    }
});
