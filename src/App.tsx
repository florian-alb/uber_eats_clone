import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "@/pages/errors/ErrorPage.tsx";
import {Login} from "@/pages/auth/Login.tsx";
import Home from "@/pages/home";
import Shop from "@/pages/shop";
import {Register} from "@/pages/auth/Register.tsx";
import Checkout from "@/pages/checkout";


//Auth Imports
//import {AuthProvider} from "@/middlewares/AuthProvider.tsx";


const router = createBrowserRouter([
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
        path: "/checkout/",
        element: <Checkout />,
        errorElement: <ErrorPage />
    }
]);

export default function App() {
    return (
            <RouterProvider router={router}/>
    )
}