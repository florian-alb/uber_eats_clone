import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Shop} from "@/types/shop.ts";
import {getShopById} from "@/api/shop.ts";
import DashboardNav, {DashboardNAvLinks} from "@/pages/dashboards/navbar/components/DashboardNav.tsx";
import SearchBar from "@/pages/dashboards/navbar/components/SearchBar.tsx";
import AccountSettings from "@/pages/dashboards/navbar/components/AccountSettings.tsx";
import EditCard from "@/pages/dashboards/pages/dashboardRestaurant/components/EditCard.tsx";

export default function DashboardRestaurant() {
    const {shopId} = useParams()

    const [shop, setShop] = useState<Shop>()

    useEffect(() => {
        if (!shopId) {
            return
        }
        getShopById(shopId).then(data => {
            setShop(data)
        })
    }, [shopId]);

    const links: DashboardNAvLinks[] = [
        {name: "Tableau de bord", link: `/dashboard/${shopId}`},
        {name: "Produits", link: `/dashboard/${shopId}/products`},
        {name: "Commandes", link: `/dashboard/${shopId}/orders`},
        {name: "Mon Restaurant", link: `/dashboard/${shopId}/settings`}
    ]

    return (
        <div className="min-h-screen w-full">
            <header className="sticky top-0 gap-4 bg-background flex flex-col">
                <div className="border-b flex h-16 items-center px-4 md:px-6">
                    <DashboardNav links={links}/>
                    <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                        <SearchBar/>
                        <AccountSettings shopName={shop?.name}/>
                    </div>

                </div>
            </header>

            <main className="flex-grow grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 m-4">
                {shop && <EditCard shop={shop}/> }
            </main>
        </div>
    )
}