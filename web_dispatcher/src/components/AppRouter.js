import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../routes";
import Desktop from "../pages/Desktop";


const AppRouter = () => {

    const user = {
        isAuth: true
    }

    return (
        <Routes>
            {user.isAuth === true && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component}/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component}/>
            )}
            <Route path='*' element={(<Desktop />)} />
        </Routes>
    );
};

export default AppRouter;