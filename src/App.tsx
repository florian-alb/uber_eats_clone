import {Outlet} from "react-router-dom";
import RouteProvider from "@/routes";
import {Toaster} from "@/components/ui/toaster.tsx";

export default function App() {
    return (
        <RouteProvider>
            <Toaster/>
            <Outlet/>
        </RouteProvider>
    )
}