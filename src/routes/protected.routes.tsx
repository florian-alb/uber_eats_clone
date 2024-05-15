import Home from "@/pages/home";
import type {RouteObject} from "react-router-dom";
import ErrorPage from "@/pages/errors/ErrorPage.tsx";
import Checkout from "@/pages/checkout";


const protectedRoutes: RouteObject[] = [
    {
        path: "/address/edit",
        element: <Home/>
    },
    {
        path: "/checkout/",
        element: <Checkout/>,
        errorElement: <ErrorPage/>
    }
]

export default protectedRoutes