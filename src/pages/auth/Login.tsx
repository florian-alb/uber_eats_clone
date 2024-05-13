import {LoginForm} from "@/pages/auth/components/LoginForm.tsx";
import NavbarAuth from "@/components/navbar/NavbarAuth.tsx";

export function Login() {

    return (
        <>
            <NavbarAuth/>
            <div className={"flex items-center justify-center h-screen w-screen"}>
                <LoginForm/>
            </div>
        </>
    )
}
