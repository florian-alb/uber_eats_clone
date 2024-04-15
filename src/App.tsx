//@ts-nocheck
import NavbarAuth from "@/components/noLib/NavbarAuth.tsx";
import Navbar from "@/components/noLib/Navbar.tsx";
import LoginForm from "@/Page/LoginPage.tsx";
import RegisterPage from "@/Page/RegisterPage.tsx";
import MainPage from "@/Page/MainPage.tsx";

export default function App() {
    return (
        <div className="w-full h-full flex flex-col">
            <Navbar />
            <MainPage />
        </div>
    )
}