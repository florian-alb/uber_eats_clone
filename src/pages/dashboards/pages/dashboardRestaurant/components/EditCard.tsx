import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Shop, ShopForm} from "@/types/shop.ts";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {toast} from "@/components/ui/use-toast.ts";
import {errorMessages} from "@/utils/errorMessages.ts";
import {patterns} from "@/utils/patterns.ts";
import {Label} from "@radix-ui/react-label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useEffect, useState} from "react";
import {Category} from "@/types/category.ts";
import {getCategories} from "@/api/category.ts";
import {saveOrUpdateShop} from "@/api/shop.ts";
import ImageUpload from "@/pages/dashboards/components/ImageUpload.tsx";
import {OutputFileEntry} from "@uploadcare/blocks";

export default function EditCard({shop}: { shop: Shop }) {
    const [categories, setCategories] = useState<Category[]>()
    const [photo, setPhoto] = useState<Pick<OutputFileEntry, | "uuid" | "cdnUrl" >>(
        {cdnUrl : shop.image, uuid: shop.id}
    );

    useEffect(() => {
        getCategories().then(c => setCategories(c))
    }, [])

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            name: shop.name,
            category: shop.category?.name,
            image: shop.image
        },
    });


    const onSubmit: SubmitHandler<ShopForm> = async data => {
        data.id = shop.id
        data.image = photo?.cdnUrl
        await saveOrUpdateShop(data)
            .then(() => {
                    toast({
                        variant: "default",
                        title: "Restaurant mis à jour",
                        description: "Restaurant mis à jour avec succès"
                    })
                }
            )
            .catch((error: Error) => {
                    console.error(error);
                    toast({
                        variant: "destructive",
                        title: "Erreur",
                        description: "Impossible de mettre à jour votre restaurant"
                    })
                }
            )
    };


    return (
        <Card>
            <CardHeader>
                <CardTitle>Mon Restaurant</CardTitle>
                <CardDescription>
                    Mofifiez les informations de votre restaurant
                </CardDescription>
            </CardHeader>
            <CardContent>

                <div className="flex items-start flex-wrap">
                    <form onSubmit={handleSubmit(onSubmit)} className={"lg:w-2/3 sm:w-full p-2 grid grid-cols-1 gap-4"}>
                        <Controller
                            name={"image"}
                            control={control}
                            render={({field}) => <input type={"hidden"} {...field}/>}
                        />

                        <div className="grid col-span-2 gap-3">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Nom</Label>
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{
                                        required: errorMessages.required_shop_name,
                                        minLength: {
                                            value: 3,
                                            message: errorMessages.min_length(3)
                                        },
                                        pattern: {
                                            value: patterns.product_name,
                                            message: errorMessages.product_name_pattern
                                        }
                                    }}
                                    render={({field}) =>
                                        <Input type="text" id="name"
                                               className="w-full"
                                               placeholder="Produit de golmon" {...field} />
                                    }
                                />
                                {errors.name && (
                                    <span className="text-red-500 text-xs">{errors.name.message}</span>
                                )}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="category">Categorie</Label>
                                <Controller
                                    name="category"
                                    control={control}
                                    rules={{
                                        required: errorMessages.required_shop_category
                                    }}
                                    render={({field}) =>
                                        <Select onValueChange={field.onChange}
                                                value={field.value ? field.value : undefined}>
                                            <SelectTrigger
                                                id="model"
                                                className="items-start [&_[data-description]]:hidden"
                                            >
                                                <SelectValue placeholder="Select a model"/>
                                            </SelectTrigger>
                                            <SelectContent>

                                                {categories && categories.map(category => (
                                                    <SelectItem key={category.id} value={category.name}>
                                                        <div className="flex items-center gap-3">
                                                            <img
                                                                className={'size-6'}
                                                                src={category.icon} alt={category.name}
                                                            />
                                                            <p>{category.name}</p>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    }
                                />
                                {errors.name && (
                                    <span className="text-red-500 text-xs">{errors.name.message}</span>
                                )}
                            </div>
                        </div>
                        <Button className={"m-auto"}>Mettre à jour</Button>
                    </form>

                    <div className="lg:w-1/3 sm:w-full grid gap-2 p-2">
                        <ImageUpload
                            file={photo} onChange={setPhoto}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


