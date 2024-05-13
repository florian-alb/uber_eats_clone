import {Dialog, DialogTitle, DialogContent, DialogFooter, DialogHeader} from "@/components/ui/dialog.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {useAuthStore} from "@/store/auth.ts";
import AddressCard from "@/components/address/AddressCard.tsx";
import {Address, AddressSuggestion} from "@/types/address.ts";
import AutocompleteAddressField from "@/components/address/AutocompleteAddressField.tsx";
import EditAddress from "@/components/address/EditAddress.tsx";
import {useQuery} from "@/lib/utils.ts";
import {useEffect, useState} from "react";

function addressQuery() {
    const query = useQuery()
    const [address, setAddress] = useState<AddressSuggestion & { id: string | null }>()

    useEffect(() => {
        const address_line1 = query.get("address_line1");
        const country = query.get("country");
        const place = query.get("place");
        const postcode = query.get("postcode");
        const addressId = query.get("address_id");

        if (address_line1 && country && place && postcode) {
            setAddress({
                address_line1: address_line1,
                country: country,
                place: place,
                postcode: postcode,
                id: addressId
            })
        } else {
            setAddress(undefined)
        }
    }, [query]);

    return address
}

function NormalContent({closeModal, autoFilledAddress}: { closeModal: () => void, autoFilledAddress: string }) {
    const { user } = useAuthStore();
    const userAddresses = user?.user.addresses

    return (
        <div id={"normal_content"}>
            <div className="relative">
                <AutocompleteAddressField/>
            </div>
            <div>
                <div className="grid gap-4 py-4">
                    <AddressCard address={autoFilledAddress}/>
                    {
                        userAddresses?.map((address: Address) => {
                            return <AddressCard {...address}/>
                        })
                    }
                </div>
            </div>

            <DialogFooter>
                <Button className={"w-full"} onClick={closeModal}>Terminé</Button>
            </DialogFooter>
        </div>
    )
}

export default function AddressEditionModal({autoFilledAddress}: { autoFilledAddress: string }) {
    const location = useLocation();
    const navigate = useNavigate();
    const isOpen = location.pathname === '/address/edit';

    const queryAddress = addressQuery();

    const closeModal = () => {
        navigate(-1);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) closeModal();
        }}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className={"mb-3"}>Détails de la livraison</DialogTitle>
                </DialogHeader>

                {queryAddress ? <EditAddress {...queryAddress}/> :

                    <NormalContent closeModal={closeModal} autoFilledAddress={autoFilledAddress}/>

                }
            </DialogContent>
        </Dialog>
    )
}