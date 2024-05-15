import type {RouteObject} from "react-router-dom";
import ErrorPage from "@/pages/errors/ErrorPage.tsx";
import {Login} from "@/pages/auth/Login.tsx";
import {Register} from "@/pages/auth/Register.tsx";

const guestRoutes: RouteObject[] = [
    {
        path: "/login",
        element: <Login/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/register",
        element: <Register/>,
        errorElement: <ErrorPage/>
    }
];

export default guestRoutes
