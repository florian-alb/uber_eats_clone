import {createBrowserRouter} from "react-router-dom";
import Home from "@/pages/home";
import ErrorPage from "@/pages/errors/ErrorPage.tsx";
import {Login} from "@/pages/auth/Login.tsx";
import {Register} from "@/pages/auth/Register.tsx";
import Shop from "@/pages/shop";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/category/:categoryId",
        element: <Home/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/login",
        element: <Login/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/register",
        element: <Register/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/shop/:id",
        element: <Shop/>,
        errorElement: <ErrorPage/>
    },
    {
        // Address modal route
        path:"/address",
        element:<Home />
    },
    {
        // TODO : protect this route
        path:"/address/edit",
        element:<Home />
    }
]);
