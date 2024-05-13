import {Input} from "@/components/ui/input.tsx";
import {MapPin} from "lucide-react";
import {mapboxSuggestions} from "@/api/address.ts";
import {useEffect, useState} from "react";
import {AddressSuggestion} from "@/types/address.ts";
import {useNavigate} from "react-router-dom";

export default function AutocompleteAddressField() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");
    const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>()

    //Debounce l'input value pour minimiser les appels API
    useEffect(() => {
        const timerId = setTimeout(() => {
            if (inputValue.length > 2) {
                mapboxSuggestions(inputValue)
                    .then(d => {
                        setAddressSuggestions(d.suggestions)
                    });
            } else {
                setAddressSuggestions([]);
            }
        }, 300);

        console.log(addressSuggestions)

        return () => clearTimeout(timerId);
    }, [inputValue]);

    function handleInputChange(e: any) {
        e.preventDefault()
        setInputValue(e.target.value);
    }

    function editAddress(address: AddressSuggestion){
        navigate(`?address_line1=${address.address_line1}&place=${address.place}&postcode=${address.postcode}&country=${address.country}`)
        console.log("click")
    }

    function AddressSuggestion(address: AddressSuggestion) {
        return (
            <div className={"flex items-center gap-3 px-4 py-2 hover:bg-border -mx-6 cursor-pointer"} onClick={() => editAddress(address)}>
                <MapPin className="size-6 text-muted-foreground"/>
                <div>
                    <p className={"font-semibold"}>{address.address_line1}</p>
                    <p className={"text-sm"}>{address.place}, {address.postcode}, {address.country}</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <div>
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                <Input onChange={handleInputChange}
                       type="search"
                       placeholder="Saississez l'adresse de livraison."
                       className="pl-8 bg-border mb-4"
                       autoComplete="full_address"
                />
            </div>
            <div>
                {addressSuggestions?.map(s => {
                        return (
                            <AddressSuggestion
                                key={s.address_line1}
                                address_line1={s.address_line1}
                                postcode={s.postcode}
                                place={s.place}
                                country={s.country}
                            />
                        )
                    }
                )}
            </div>
        </>
    )
}