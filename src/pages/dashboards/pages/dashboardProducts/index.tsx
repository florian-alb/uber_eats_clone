import {useEffect, useState} from "react";
import {getShopById} from "@/api/shop.ts";
import {useNavigate, useParams} from "react-router-dom";
import {Shop} from "@/types/shop.ts";
import DashboardNav, {DashboardNAvLinks} from "@/pages/dashboards/navbar/components/DashboardNav.tsx";
import AccountSettings from "@/pages/dashboards/navbar/components/AccountSettings.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import DashboardCardTitle from "@/pages/dashboards/pages/dashboardHome/components/DashboardCardTitle.tsx";
import {Product} from "@/types/product.ts";
import ProductsTable from "@/pages/dashboards/pages/dashboardProducts/components/ProductsTable.tsx";
import NoProducts from "@/pages/dashboards/pages/dashboardProducts/components/NoProducts.tsx";
import {Button} from "@/components/ui/button.tsx";
import {PlusCircle} from "lucide-react";
import {useProductStore} from "@/store/product.ts";
import {archiveProduct} from "@/api/product.ts";
import {toast} from "@/components/ui/use-toast.ts";

export default function DashboardProducts() {
    const {shopId} = useParams()
    const navigate = useNavigate()
    const productStore = useProductStore()

    const [shop, setShop] = useState<Shop>()
    const [products, setProducts] = useState<Product[]>()

    useEffect(() => {
        if (!shopId) {
            return
        }
        getShopById(shopId).then(data => {
            setShop(data)
            setProducts(data.products)
        })
    }, [shopId, productStore.product]);

    const links: DashboardNAvLinks[] = [
        {name: "Tableau de bord", link: `/dashboard/${shopId}`},
        {name: "Produits", link: `/dashboard/${shopId}/products`},
        {name: "Commandes", link: `/dashboard/${shopId}/orders`},
        {name: "Mon Restaurant", link: `/dashboard/${shopId}/settings`}
    ]

    function onEditClick(product: Product) {
        productStore.setProduct(product)
        navigate("./edit")
    }

    function addProduct() {
        productStore.removeProduct()
        navigate("./edit")
    }

    function onArchiveClick(product: Product) {
        archiveProduct(product.id).then(() => {
            // Show the toast notification
            toast({
                variant: "default",
                title: "Produit Archivé",
                description: "Produit archivé avec succès"
            });
            // Update the products state
            setProducts(prevProducts =>
                prevProducts?.map(p =>
                    p.id === product.id ? {...p, isPublished: !p.isPublished} : p
                )
            );

        }).catch(error => {
            // Handle error
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Erreur lors de l'archivage du produit"
            });
            console.error("Error archiving product:", error);
        });
    }

    return (
        <div className="min-h-screen w-full">
            <header className="sticky top-0 gap-4 bg-background flex flex-col">
                <div className="border-b flex h-16 items-center px-4 md:px-6">
                    <DashboardNav links={links}/>
                    <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                        {/*<SearchBar/>*/}
                        <AccountSettings shopName={shop?.name} shopId={shop?.id}/>
                    </div>

                </div>
                <div className="grid px-4 sm:px-6 sm:py-0 mx-4">
                    <Button onClick={addProduct} size="sm" className="h-8 gap-1 ml-auto">
                        <PlusCircle className="h-3.5 w-3.5"/>
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Ajouter un produit
                  </span>
                    </Button>
                </div>
            </header>

            <main className="flex-grow grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 m-4">
                <Card className="h-full">
                    <DashboardCardTitle title={'Produits'}
                                        description={'Produits de votre restaurant.'}
                    />
                    <CardContent>
                        {products ?
                            <ProductsTable products={products} onEditClick={onEditClick}
                                           onArchiveClick={onArchiveClick}/> :
                            <NoProducts/>
                        }
                    </CardContent>
                </Card>

            </main>
        </div>
    )
}
