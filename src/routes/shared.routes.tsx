import type {RouteObject} from "react-router-dom";
import Home from "@/pages/home";
import Shop from "@/pages/shop";
import ErrorPage from "@/pages/errors/ErrorPage.tsx";
import NewRestaurant from "@/pages/newRestaurant";
const sharedRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Home/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/new-restaurant",
        element: <NewRestaurant/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/address",
        element: <Home/>
    },
    {
        path: "/category/:categoryId",
        element: <Home/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/shop/:id",
        element: <Shop/>,
        errorElement: <ErrorPage/>
    }
];

export default sharedRoutes;
