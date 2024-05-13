import {MapPin, Pencil} from "lucide-react";
import {useNavigate} from "react-router-dom";

export default function AddressCard({address, id}: { address: string, id?: string }) {
    const navigate = useNavigate();

    function editAddress() {
        const addressArray = address.split(',');
        const postcodeAndPlace = addressArray[1].split(' ');
        const queryAddress = {
            address_line1: addressArray[0],
            postcode: postcodeAndPlace[1],
            place: postcodeAndPlace[2],
            country: addressArray[2].trim(),
            id: id ? id : ""
        }

        navigate('?' + new URLSearchParams({
                address_line1: queryAddress.address_line1,
                place: queryAddress.place,
                postcode: queryAddress.postcode,
                country: queryAddress.country,
                address_id: queryAddress.id
            }
        ))
    }

    return (
        <div className={"flex items-center justify-between"}>
            <MapPin className={"size-8 basis-1/6"}/>
            <p className={"basis-4/6"}>{address}</p>
            <Pencil className={"rounded-full basis-1/6 hover:stroke-black/50"} onClick={editAddress}/>
        </div>
    )
}