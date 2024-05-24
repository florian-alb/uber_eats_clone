import NavbarAuth from "@/components/navbar/NavbarAuth.tsx";
import {useAuthStore} from "@/store/auth.ts";
import {useNavigate} from "react-router-dom";
import {RegisterRestaurant} from "@/pages/newRestaurant/components/RegisterRestaurant.tsx";
import {useEffect} from "react";

export default function NewRestaurant() {
    const user = useAuthStore().user
    const navigate = useNavigate()

    useEffect(() => {
        console.log(user)
        function getShop() {
            if (user?.shop) {
                navigate(`/dashboard/${user.shop.id}`)
            }
        }
        getShop()
    }, [navigate, user]);

    return (
        <>
            <NavbarAuth/>
            <div className={"flex items-center justify-center h-screen w-screen"}>
                <RegisterRestaurant/>
            </div>
        </>
    )
}