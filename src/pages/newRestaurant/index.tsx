import NavbarAuth from "@/components/navbar/NavbarAuth.tsx";
import {LoginForm} from "@/pages/auth/components/LoginForm.tsx";
import {useAuthStore} from "@/store/auth.ts";
import {useNavigate} from "react-router-dom";

export default function NewRestaurant() {
    const {user} = useAuthStore()
    const navigate = useNavigate()

    function getShop() {
        if (user?.shop.id){
            navigate(`/dashboard${user.shop.id}`)
        }
    }

    return (
        <>
            <NavbarAuth/>
            <div className={"flex items-center justify-center h-screen w-screen"}>
                <LoginForm/>
            </div>
        </>
    )
}