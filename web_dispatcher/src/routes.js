import {DESKTOP_ROUTE, HISTORY_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import Auth from "./pages/Auth";
import Desktop from "./pages/Desktop";

export const authRoutes = [
    {
        path: DESKTOP_ROUTE,
        Component: <Desktop />
    },
    {
        path: HISTORY_ROUTE,
        Component: <Desktop history={true}/>
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Auth />
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth />
    },
]