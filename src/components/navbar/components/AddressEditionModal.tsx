import {Dialog, DialogTitle, DialogContent, DialogFooter, DialogHeader} from "@/components/ui/dialog.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {useAuthStore} from "@/store/auth.ts";
import AddressCard from "@/components/navbar/components/AddressCard.tsx";
import {Address, AddressSuggestion} from "@/types/address.ts";
import AutocompleteAddressField from "@/components/navbar/components/AutocompleteAddressField.tsx";
import EditAddress from "@/components/EditAddress.tsx";
import {useQuery} from "@/lib/utils.ts";
import {useEffect, useState} from "react";

function addressQuery() {
    const query = useQuery()
    const [address, setAddress] = useState<AddressSuggestion>()

    useEffect(() => {
        const address_line1 = query.get("address_line1");
        const country = query.get("country");
        const place = query.get("place");
        const postcode = query.get("postcode");

        if (address_line1 && country && place && postcode) {
            setAddress({address_line1: address_line1, country: country, place: place, postcode: postcode})
        } else {
            setAddress(undefined)
        }
    }, [query]);

    return address
}

function NormalContent(props: {closeModal: ()=>void, address: string| null}){
    const user = useAuthStore().user;
    const userAddresses = user?.addresses;

    return (
        <div id={"normal_content"}>
            <div className="relative">
                <AutocompleteAddressField/>
            </div>
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
                <Button className={"w-full"} onClick={props.closeModal}>Terminé</Button>
            </DialogFooter>
        </div>
    )
}

export default function AddressEditionModal(props: { address: string | null }) {
    const location = useLocation();
    const navigate = useNavigate();
    const isOpen = location.pathname === '/address/edit';

    const address = addressQuery();

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

                {address ?
                    <EditAddress address_line1={address.address_line1} country={address.country} place={address.place}
                                 postcode={address.postcode}/> :

                    <NormalContent closeModal={closeModal} address={props.address}/>

                }
            </DialogContent>
        </Dialog>
    )
}