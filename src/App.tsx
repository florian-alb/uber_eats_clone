import {createBrowserRouter, RouterProvider} from "react-router-dom";
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
//@ts-nocheck
import NavbarAuth from "@/components/noLib/NavbarAuth.tsx";
import Navbar from "@/components/noLib/Navbar.tsx";
import LoginForm from "@/Page/LoginPage.tsx";
import RegisterPage from "@/Page/RegisterPage.tsx";
import Index from "@/Page/Main";
import MainPage from "@/Page/Main";

export default function App() {
    return (
        <MainPage/>
    )
}