import {Link} from "react-router-dom";


export default function NavbarAuth() {
    return (
        <div className="w-full h-16 flex justify-between items-center px-10 py-5 relative bg-black text-white">
            <Link to="/" className="ml-5 text-3xl tracking-tight">
                Uber
                <span className="ml-2 text-ub-green font-medium  tracking-normal">Eats</span>
            </Link>
        </div>
    )
}