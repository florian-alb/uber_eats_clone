import {Link, NavLink} from "react-router-dom";
import {Menu, Package2} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";

export type DashboardNAvLinks = {
    name: string,
    link: string
}

export default function DashboardNav({links}: { links: DashboardNAvLinks[] }) {

    return (
        <>
            <nav
                className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                {/*logo*/}
                <Link
                    to="#"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <Package2 className="h-6 w-6"/>
                    <span className="sr-only">Acme Inc</span>
                </Link>
                {/*end logo*/}

                {links.map((elem, index) => {
                        return (
                            <NavLink
                                key={index}
                                to={elem.link}
                                className={({isActive}) =>
                                    `transition-colors hover:text-foreground 
                                    ${isActive ? "text-foreground" : "text-muted-foreground"}`
                                }
                            >
                                {elem.name}
                            </NavLink>
                        )
                    }
                )}
            </nav>

            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5"/>
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        {/*logo*/}
                        <Link
                            to="#"
                            className="flex items-center gap-2 text-lg font-semibold md:text-base"
                        >
                            <Package2 className="h-6 w-6"/>
                            <span className="sr-only">Acme Inc</span>
                        </Link>

                        {links.map((elem, index) => {
                                return (
                                    <NavLink
                                        key={index}
                                        to={elem.link}
                                        className={({isActive}) => `transition-colors hover:text-foreground
                                        ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                                        {elem.name}
                                    </NavLink>
                                )
                            }
                        )}

                    </nav>
                </SheetContent>
            </Sheet>
        </>
    )
}
