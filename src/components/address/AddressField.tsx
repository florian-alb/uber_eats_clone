import {MapPin} from "lucide-react";
import {useEffect, useState} from "react";
import {Dialog, DialogTrigger} from "@/components/ui/dialog.tsx";
import ModalContent from "@/components/address/ModalContent.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import AddressEditionModal from "@/components/address/AddressEditionModal.tsx";
import {convertAddress} from "@/api/address.ts";

export default function AddressField() {
    const [address, setAddress] = useState(localStorage.getItem("loc"))
    const navigate = useNavigate();
    const location = useLocation();
    const isOpen = location.pathname === '/address';
    const closeModal = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((success), () => console.log("Unable to retrieve your location"));
        } else {
            console.log("Geolocation not supported");
        }
    }, []);

    function success(position: GeolocationPosition) {
        convertAddress(position)
            .then(data => {
                const navigatorAddress = data.features[0].properties.full_address;
                setAddress(navigatorAddress)
                localStorage.setItem("loc", navigatorAddress)
            })
            .catch(error => console.error("Error when fetching mapbox API: ", error));
    }


    return (
        <>
            <Dialog open={isOpen} onOpenChange={(open) => {
                if (!open) closeModal();
            }}>
                <DialogTrigger asChild onClick={() => navigate('./address')}>
                    <div className={"flex gap-1 items-center pr-4 cursor-pointer"}>
                        <MapPin className={"size-7"}/>
                        <p className={"text-sm line-clamp-1"}>{address}</p>
                    </div>
                </DialogTrigger>
                <ModalContent address={address}/>
            </Dialog>

            <AddressEditionModal autoFilledAddress={address ? address : ""}/>
        </>
    )
}
