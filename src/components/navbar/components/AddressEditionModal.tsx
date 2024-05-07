import { Dialog, DialogTitle,DialogContent, DialogFooter, DialogHeader} from "@/components/ui/dialog.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {useAuthStore} from "@/store/auth.ts";
import AddressCard from "@/components/navbar/components/AddressCard.tsx";
import {Address} from "@/types/address.ts";
import {Input} from "@/components/ui/input.tsx";
import {MapPin} from "lucide-react";

export default function AddressEditionModal(props: {address: string| null}) {
    const navigate = useNavigate();
    const location = useLocation();
    const isOpen = location.pathname === '/address/edit';
    const closeModal = () => {
        navigate(-1);
    };

    const user = useAuthStore().user;
    const userAddresses = user?.addresses;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) closeModal();
        }}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className={"mb-3"}>Détails de la livraison</DialogTitle>
                    <form>
                        <div className="relative">
                            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                            <Input
                                type="search"
                                placeholder="Saississez l'adresse de livraison."
                                className="pl-8 bg-border"
                            />
                            {/*<AddressAutofill/>*/}
                        </div>
                    </form>
                </DialogHeader>
                <div>
                    <div className="grid gap-4 py-4">
                        <AddressCard address={props.address} filled={true}/>
                        {
                            userAddresses?.map((address: Address) => {
                                return <AddressCard address={address.address}/>
                            })
                        }
                    </div>
                </div>


                <DialogFooter>
                    <Button className={"w-full"} onClick={closeModal}>Terminé</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}