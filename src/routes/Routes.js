import React, { lazy } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import {
	RoutesNames,
 } from './RoutesNames';

import MAIN from "../Pages/Main/Main";
import NEW from "../Pages/New/New";
import VIEW from "../Pages/View/View";
import UPDATE from "../Pages/Update/Update";
import TRANSFORM from "../Pages/Transform/Transform";
const RoutesDef = () => {
	const location = useLocation();
	return (
		<Routes location={location}>
			<Route
				path={RoutesNames.main.path}
				element={<MAIN />}
			/>
			<Route
				path={`${RoutesNames.view.path}/:id`} 
				element={<VIEW />}
			/>
            <Route
				path={`${RoutesNames.edit.path}/:id`} 
				element={<UPDATE />}
			/>
			<Route
				path={RoutesNames.transform.path} 
				element={<TRANSFORM />}
			/>
            <Route
				exact
				path={RoutesNames.new.path}
				element={<NEW />}
			/>
			
			<Route element={<MAIN />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};

export default RoutesDef;
