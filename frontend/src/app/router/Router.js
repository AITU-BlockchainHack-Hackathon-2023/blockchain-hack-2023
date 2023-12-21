import React from 'react';
import { Routes, Route } from "react-router-dom";

import {routeConfig} from "./routerConfig";

export const Router = () => {

	return (<>
		<Routes>
			{Object.values(routeConfig).map(({ element, path }) => (
				<Route
					key={path}
					path={path}
					element={element}
				/>
			))}
		</Routes>
	</>);
}

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/
