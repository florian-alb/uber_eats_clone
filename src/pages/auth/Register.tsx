import NavbarAuth from "@/components/navbar/NavbarAuth.tsx";
import {RegisterForm} from "@/pages/auth/components/RegisterForm.tsx";

export function Register() {

    return (
        <>
            <NavbarAuth/>
            <div className={"flex items-center justify-center h-screen w-screen"}>
                <RegisterForm/>
            </div>
        </>
    )
}
