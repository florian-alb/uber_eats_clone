import {
    ChevronLeft, EuroIcon,
    Upload,
} from "lucide-react"
import {Button, buttonVariants} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {ProductForm} from "@/types/product.ts";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {errorMessages} from "@/utils/errorMessages.ts";
import {patterns} from "@/utils/patterns.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {saveOrUpdateProduct} from "@/api/product.ts";
import ConfirmationModal from "@/pages/dashboards/components/ConfirmationModal.tsx";
import {useProductStore} from "@/store/product.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";

export function ProductEditor() {
    const [isSaved, setIsSaved] = useState(false)
    const store = useProductStore();
    const navigate = useNavigate();
    const {shopId} = useParams();

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            name: store.product?.name,
            description: store.product?.description,
            price: store.product?.price,
            image: store.product?.image ? store.product.image : '/src/assets/image_placeholder.png',
            id: store.product?.id,
            shopId: shopId
        },
    });

    const onSubmit: SubmitHandler<ProductForm> = async data => {
        await saveOrUpdateProduct(data)
            .then(() => {
                    setIsSaved(true);
                    toast({
                        variant: "default",
                        title: "Produit Sauvegardé",
                        description: "Produit sauvegardé avec succès"
                    })
                }
            )
            .catch((error: Error) => {
                    console.error(error);
                    toast({
                        variant: "destructive",
                        title: "Erreur",
                        description: "Impossible de créer ou modifier le produit"
                    })
                }
            )
    };

    function goBack() {
        store.removeProduct();
        navigate(-1)
    }

    return (
        <div className="min-h-screen w-full container">
            <form onSubmit={handleSubmit(onSubmit)} method="POST">

                {/* Product id */}
                <Controller
                    name="id"
                    control={control}
                    render={({field}) =>
                        <Input type="hidden" id="id" {...field}/>
                    }
                />
                {/* Shop id */}
                <Controller
                    name="shopId"
                    control={control}
                    render={({field}) =>
                        <Input type="hidden" id="shopId" {...field}/>
                    }
                />

                <header className="sticky top-0 gap-4 bg-background flex flex-col">
                    <div className="flex h-16 items-center px-4 md:px-6 gap-4">
                        <Button type={isSaved ? "button" : undefined} onClick={goBack} variant="outline" size="icon"
                                className="h-7 w-7">
                            <ChevronLeft className="h-4 w-4"/>
                            <span className="sr-only">Back</span>
                        </Button>
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            {store.product?.name ? store.product.name : "Nouveau produit"}
                        </h1>
                        <div className="items-center gap-2 ml-auto flex">
                            <ConfirmationModal
                                description={"Si vous abandonnez les modifications, vous supprimez toutes les modifications que vous avez apportées depuis la dernière sauvegarde."}
                                title={"Annuler toutes les modifications non sauvegardées"}
                                cancelText={"Continuer l'édition"}
                                continueText={"Annuler les changements"}
                                cancelChanges={goBack}>
                                <span className={buttonVariants({variant: "outline", size: "sm"})}>
                                    Annuler
                                </span>
                            </ConfirmationModal>


                            <Button type={"submit"} size="sm">Sauvegarder</Button>
                        </div>
                    </div>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className="mx-auto grid flex-1 auto-rows-max gap-4">
                        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                <Card className={"flex-grow"}>
                                    <CardHeader>
                                        <CardTitle>Détails du produit</CardTitle>
                                        <CardDescription>
                                            Modifiez les détails du produit
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid gap-3">
                                                <Label htmlFor="name">Nom</Label>
                                                <Controller
                                                    name="name"
                                                    control={control}
                                                    rules={{
                                                        required: errorMessages.required_product_name,
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
                                                <Label htmlFor="description">Description</Label>
                                                <Controller
                                                    name="description"
                                                    control={control}
                                                    rules={{
                                                        required: errorMessages.required_product_description,
                                                        minLength: {
                                                            value: 3,
                                                            message: errorMessages.min_length(3)
                                                        },
                                                        pattern: {
                                                            value: patterns.product_description,
                                                            message: errorMessages.product_description_pattern
                                                        }
                                                    }}
                                                    render={({field}) =>
                                                        <Textarea
                                                            id="description"
                                                            placeholder="Description de malade"
                                                            className="min-h-32"
                                                            {...field}
                                                        />
                                                    }
                                                />

                                                {errors.description && (
                                                    <span
                                                        className="text-red-500 text-xs">{errors.description.message}</span>
                                                )}

                                            </div>
                                            <div className="grid gap-3">
                                                <Label htmlFor="price">Prix</Label>

                                                <Controller
                                                    name="price"
                                                    control={control}
                                                    rules={{
                                                        required: errorMessages.required_product_price,
                                                        pattern: {
                                                            value: patterns.product_price,
                                                            message: errorMessages.product_price_pattern
                                                        }
                                                    }}
                                                    render={({field}) =>
                                                        <div className="relative">
                                                            <EuroIcon
                                                                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400"/>
                                                            <Input
                                                                placeholder="69.69"
                                                                id="price"
                                                                type="text"
                                                                className="w-full pl-10"
                                                                {...field}
                                                            />
                                                        </div>
                                                    }
                                                />

                                                {errors.price && (
                                                    <span className="text-red-500 text-xs">{errors.price.message}</span>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                                <Card
                                    className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                                >
                                    <CardHeader>
                                        <CardTitle>Images du Produit</CardTitle>
                                        <CardDescription>
                                            Ajoutez, Mofifiez ou supprimez l'image du produit.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-2">
                                            <img
                                                alt="Product image"
                                                className="aspect-square w-full rounded-md object-cover bg-muted"
                                                height="300"
                                                src={store.product?.image ? store.product.image : "/src/assets/image_placeholder.png"}
                                                width="300"
                                            />
                                            <div className="grid grid-cols-3 gap-2">
                                                <button
                                                    className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                                    <Upload className="h-4 w-4 text-muted-foreground"/>
                                                    <span className="sr-only">Upload</span>
                                                </button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </main>
            </form>
        </div>
    )
}
