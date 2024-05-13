import {MapPin, Pencil} from "lucide-react";
import {useNavigate} from "react-router-dom";

export default function AddressCard(props: { address: string | null, filled?: boolean }) {
    const navigate = useNavigate();

    function editAddress() {
        if (props.address !== null) {
            const addressArray = props.address.split(',');
            const postcodeAndPlace = addressArray[1].split(' ');
            const address = {
                address_line1: addressArray[0],
                postcode: postcodeAndPlace[1],
                place: postcodeAndPlace[2],
                country: addressArray[2]
            }
            navigate(`?address_line1=${address.address_line1}&place=${address.place}&postcode=${address.postcode}&country=${address.country}`)
        }
    }

    return (
        <div className={"flex items-center justify-between"}>
            <MapPin className={"size-10 basis-1/6"} fill={props.filled ? "black" : "white"}
                    stroke={props.filled ? "white" : "black"}/>
            <p className={"basis-4/6"}>{props.address}</p>
            <Pencil className={"rounded-full basis-1/6 hover:stroke-black/50"} onClick={editAddress}/>
        </div>
    )
}