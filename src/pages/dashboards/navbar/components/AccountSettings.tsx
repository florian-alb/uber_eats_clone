import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CircleUser} from "lucide-react";
import {useAuthStore} from "@/store/auth.ts";
import {Link} from "react-router-dom";

export default function AccountSettings({shopName}: {shopName?: string}) {
    const {logout} = useAuthStore();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                    <CircleUser className="h-5 w-5"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{shopName}</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <Link to={'/settings'}>
                        Paramètres
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Déconnexion</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}