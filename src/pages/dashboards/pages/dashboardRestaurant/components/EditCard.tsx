import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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

export default function EditCard({shop}: { shop: Shop }) {
    const [categories, setCategories] = useState<Category[]>()

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
            image: shop.image ? shop.image : '/src/assets/image_placeholder.png',
        },
    });


    const onSubmit: SubmitHandler<ShopForm> = async data => {
        data.id = shop.id
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle>Mon Restaurant</CardTitle>
                    <CardDescription>
                        Mofifiez les informations de votre restaurant
                    </CardDescription>
                </CardHeader>
                <CardContent>

                    <div className="grid lg:grid-cols-2 gap-4 items-start md:grid-cols-1 sm:grid-cols-1">
                        <div className="grid gap-3">
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
                                                    <SelectItem value={category.name}>
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

                        <div className="grid gap-2">
                            <Controller
                                name="image"
                                control={control}
                                rules={{
                                    required: errorMessages.required_shop_name
                                }}
                                render={({field}) =>
                                    <>
                                        <input type="file" id="image" name={field.name}/>
                                        <img alt="Product image"
                                             className="aspect-square w-full rounded-md object-cover"
                                             height="300"
                                             src="/src/assets/image_placeholder.png"
                                             width="300"
                                        />
                                    </>
                                }
                            />
                            {errors.name && (
                                <span className="text-red-500 text-xs">{errors.name.message}</span>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Mettre à jour</Button>
                </CardFooter>
            </Card>
        </form>
    )
}


