import {Input} from "@/components/ui/input.tsx";
import {Address} from "@/types/address.ts";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {errorMessages} from "@/utils/errorMessages.ts";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {getUser} from "@/utils/auth.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {countriesList} from "@/utils/countries.ts";
import {addAddress} from "@/api/address.ts";
import {useAuthStore} from "@/store/auth.ts";
import {useNavigate} from "react-router-dom";

type formType = {
    addressLine1: string,
    addressLine2: string,
    postcode: string,
    place: string,
    country: string,
}

export default function EditAddress(address: {address_line1: string, country: string, place: string, postcode: string, id: string}) {
    const userId = getUser().user.id
    const authStore = useAuthStore();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<formType> = async (data) => {
        const body: Address = {
            id: address.id,
            address: `${data.addressLine1}, ${data.addressLine2}, ${data.postcode} ${data.place}, ${data.country}`,
            userId: userId
        }
        const response = await addAddress(body)
        if (response){
            await authStore.refresh()
            navigate("/")
        }
    };

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            addressLine1: address.address_line1,
            addressLine2: "",
            postcode: address.postcode,
            place: address.place,
            country: address.country,
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} method="POST" className={"gap-1 flex flex-col"}>
            <div>
                <Label htmlFor="addressLine1">Adresse</Label>
                <Controller
                    name="addressLine1"
                    control={control}
                    rules={{required: errorMessages.required_address}}
                    render={({field}) => <Input id="addressLine1" placeholder="ex: 1 rue de Pupuce" {...field}/>}
                />
                {errors.addressLine1 && (
                    <span className="text-red-500 text-xs">{errors.addressLine1.message}</span>
                )}
            </div>
            <div>
                <Label htmlFor="addressLine2">Complément d'adresse (optionnel)</Label>
                <Controller
                    name="addressLine2"
                    control={control}
                    rules={{required: false}}
                    render={({field}) => (
                        <Input id="addressLine2" placeholder="Numéro d'appartement, étage..." {...field}/>

                    )}
                />
            </div>
            <div className={"flex justify-between"}>
                <div>
                    <Label htmlFor="postcode">Code postal</Label>
                    <Controller
                        name="postcode"
                        control={control}
                        rules={{required: errorMessages.required_postcode}}
                        render={({field}) => (
                            <Input id="postcode" placeholder="ex: 31000" {...field}/>

                        )}
                    />
                    {errors.postcode && (
                        <span className="text-red-500 text-xs">{errors.postcode.message}</span>
                    )}
                </div>
                <div>
                    <Label htmlFor="place">Ville</Label>
                    <Controller
                        name="place"
                        control={control}
                        rules={{required: errorMessages.required_city}}
                        render={({field}) => (
                            <Input id="place" placeholder="ex: Toulouse" {...field}/>
                        )}
                    />
                    {errors.place && (
                        <span className="text-red-500 text-xs">{errors.place.message}</span>
                    )}
                </div>
            </div>
            <div>
                <Label htmlFor="country">Pays</Label>
                <Controller
                    name="country"
                    control={control}
                    rules={{required: errorMessages.required_country}}
                    render={({field}) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder={field.value}/>
                            </SelectTrigger>
                            <SelectContent>
                                {countriesList.map(country => <SelectItem key={country} value={country}
                                                                          onSelect={() => field.onChange(country)}>{country}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.country && (
                    <span className="text-red-500 text-xs">{errors.country.message}</span>
                )}
            </div>
            <Button type="submit" className="w-full bg-black text-white rounded mt-3 hover:bg-black/80">Valider</Button>
        </form>
    )
}
