import {createBrowserRouter, RouterProvider, useParams} from "react-router-dom";
import MainPage from "@/Page/MainPage.tsx";
import LoginPage from "@/Page/LoginPage.tsx";
import RegisterPage from "@/Page/RegisterPage.tsx";
import ShopPage from "@/Page/ShopPage.tsx";
import ErrorPage from "@/Page/ErrorPage.tsx";

    const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/register",
        element: <RegisterPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/shop/:id",
        element: <ShopPage />,
        errorElement: <ErrorPage />
    },
    {
    }
]);

export default function App() {
    return (
        <RouterProvider router={router}/>
    )
}