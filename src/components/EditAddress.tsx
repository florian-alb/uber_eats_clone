import {Input} from "@/components/ui/input.tsx";
import {AddressSuggestion} from "@/types/address.ts";
import {Button} from "@/components/ui/button.tsx";
//import {addAddress} from "@/api/address.ts";

export default function EditAddress(address : AddressSuggestion) {
    function saveAddress(e: any){
        e.preventDefault()
        console.log(e.target.value)
        //addAddress()
    }

    return(
        <form className={"flex flex-col gap-1"} onSubmit={saveAddress}>
            <Input placeholder={"Addresse"} defaultValue={address?.address_line1} name={"address_line1"} id={"address_line1"}/>
            <Input placeholder={"Appartement / Etage / Baptiment"} name={"address_line2"} id={"address_line2"}/>
            <Input placeholder={"Code postal"} defaultValue={address?.postcode} name={"postCode"} id={"postCode"}/>
            <Input placeholder={"Ville"} defaultValue={address?.place} name={"place"} id={"place"}/>
            <Input placeholder={"Pays"} defaultValue={address?.country} name={"country"} id={"country"}/>

            <Button type={"submit"} className={"w-full"}>Terminé</Button>
        </form>
    )
}

// todo : react hook form
