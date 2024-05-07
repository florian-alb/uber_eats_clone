import {MapPin, Pencil} from "lucide-react";

export default function AddressCard(props : {address: string|null, filled?: boolean}){
    return(
        <div className={"flex items-center justify-between"}>
            <MapPin className={"size-10 basis-1/6"} fill={props.filled ? "black" : "white"} stroke={props.filled ? "white" : "black"}/>
            <p className={"basis-4/6"}>{props.address}</p>
            <Pencil className={"rounded-full basis-1/6 hover:stroke-black/50"}/>
        </div>
    )
}