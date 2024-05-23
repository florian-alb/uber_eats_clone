import NavbarAuth from "@/components/navbar/NavbarAuth.tsx";
import {useAuthStore} from "@/store/auth.ts";
import {useNavigate} from "react-router-dom";
import {RegisterRestaurant} from "@/pages/newRestaurant/components/RegisterRestaurant.tsx";
import {useEffect} from "react";
import {User} from "@/types/user.ts";

export default function NewRestaurant() {
    const user = useAuthStore().user
    const navigate = useNavigate()

    function getShop() {
        if (user.user?.shop) {
            navigate(`/dashboard/${user.user.shop.id}`)
        } else {
            return (<></>)
        }
    }

    useEffect(() => {
        getShop()
    }, [getShop]);

    return (
        <>
            <NavbarAuth/>
            <div className={"flex items-center justify-center h-screen w-screen"}>
                <RegisterRestaurant/>
            </div>
        </>
    )
}