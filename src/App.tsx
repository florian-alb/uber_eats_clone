import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainPage from "@/Page/Main";
import RegisterPage from "@/Page/RegisterPage.tsx";
import ShopPage from "@/Page/ShopPage.tsx";

function ErrorPage() {
    return null;
}

function LoginPage() {
    return null;
}

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