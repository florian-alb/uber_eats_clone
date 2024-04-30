import {lazy, Suspense} from "react";

const Navbar = lazy(() => import("@/components/noLib/Navbar.tsx"));
import {Loader2} from 'lucide-react';
import Categories from "@/components/layout/Categories.tsx";
import Shops from "@/components/layout/Shops.tsx";

export const Icons = {
    spinner: Loader2,
};

export default function MainPage(): JSX.Element {
    return (
        <>
            <Suspense fallback={
                <div className="flex w-full h-full justify-center flex-col items-center">
                    <h1 className="text-4xl font-bold">Welcome To Uber Eat</h1>
                    <Icons.spinner className="h-24 w-24 stroke animate-spin"/>
                </div>
            }>
            <Navbar/>
            </Suspense>
            <div className="flex justify-center">
                <div className=" w-3/4 h-full gap-4 mt-20 flex flex-wrap justify-center">
                    <Categories/>
                    <Shops/>
                </div>
            </div>
        </>
    )
}
