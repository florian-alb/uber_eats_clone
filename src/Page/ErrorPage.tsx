<<<<<<< HEAD
import NavbarAuth from "@/components/NavbarAuth.tsx";
=======
import NavbarAuth from "@/components/noLib/NavbarAuth.tsx";
>>>>>>> e4149666d9a80eeeeddb865ec686770ec087497f
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";

export default function ErrorPage() {
    return (
        <>
            <NavbarAuth />
            <div className="flex justify-center items-center h-screen flex-col">
                <img src="/src/assets/svg/Error.svg" className="object-cover" alt="Not found"/>
                <div className="flex justify-center flex-col gap-5">
                    <h1 className="text-4xl font-semibold w-3/4 text-center m-auto mt-5">Rien à se mettre sous la dent ici…</h1>
                    <p className="m-auto text-lg">Découvrez de bons petits plats.</p>
                    <Link to="/" className="m-auto min-w-96">
                        <Button className="bg-ub-dark py-7 w-full text-white rounded-xl hover:bg-gray-800 text-lg">Afficher les établissements</Button>
                    </Link>
                </div>

            </div>
        </>
    )
}