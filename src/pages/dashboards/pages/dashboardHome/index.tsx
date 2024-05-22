import {
    CookingPot,
    DollarSignIcon, Drumstick,
} from "lucide-react"
import {
    Card,
    CardContent,
} from "@/components/ui/card.tsx"
import {
    TableColumn,
} from "@/pages/dashboards/components/DashboardTable.tsx";
import DashboardCardTitle from "@/pages/dashboards/pages/dashboardHome/components/DashboardCardTitle.tsx";
import DashboardNav, {DashboardNAvLinks} from "@/pages/dashboards/navbar/components/DashboardNav.tsx";
import CardStatistics, {CardData} from "@/pages/dashboards/pages/dashboardHome/components/CardStatistics.tsx";
import AccountSettings from "@/pages/dashboards/navbar/components/AccountSettings.tsx";
import SearchBar from "@/pages/dashboards/navbar/components/SearchBar.tsx";
import LastOrders from "@/pages/dashboards/pages/dashboardHome/components/LastOrders.tsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getShopById} from "@/api/shop.ts";
import {Shop} from "@/types/shop.ts";
import DashboardTable from "@/pages/dashboards/components/DashboardTable.tsx";
import {Order} from "@/types/order.ts";
import {
    formatDate,
    getFullName,
    getOrderTotal,
    getRevenue,
    getTodayOrders,
    getTotalOrderedProducts
} from "@/utils/order.ts";

export function Dashboard() {
    const {shopId} = useParams()

    const [shop, setShop] = useState<Shop>()
    const [orders, setOrders] = useState<Order[]>()

    useEffect(() => {
        if (!shopId) {
            return
        }
        getShopById(shopId).then(data => {
            setShop(data)
            setOrders(data.orders)
        })
    }, [shopId]);

    //const filters = ["Livrées", "En cours de livraison", "Annulées"]
    const columns: TableColumn<Order>[] = [
        {
            columnDef: 'customer',
            header: 'Client',
            cell: element => getFullName(element)
        },
        {
            columnDef: 'isDelivered',
            header: 'Statut',
            badge: element => element.isDelivered ? "constructive" : "destructive",
            cell: element => element.isDelivered ? "Livrée" : "En cours de livraison"
        },
        {
            columnDef: 'date',
            header: 'Date',
            cell: element => formatDate(element.createdAt)
        },
        {
            columnDef: 'total',
            header: 'Total',
            cell: element => getOrderTotal(element)
        },
    ]

    const links: DashboardNAvLinks[] = [
        {name: "Tableau de bord", link: `/dashboard/${shopId}`},
        {name: "Produits", link: `/dashboard/${shopId}/products`},
        {name: "Commandes", link: `/dashboard/${shopId}/orders`},
        {name: "Mon Restaurant", link: `/dashboard/${shopId}/settings`}
    ]

    const cardData: CardData[] = [
        {
            title: "Total Revenue",
            currentMonthStat: getRevenue(orders),
            todayStat: getRevenue(getTodayOrders(orders)),
            currency: "€",
            icon: DollarSignIcon
        },
        {
            title: "Total orders",
            currentMonthStat: orders?.length ? orders?.length : 0,
            todayStat: getTodayOrders(orders).length,
            icon: CookingPot
        },
        {
            title: "Total ordered products",
            currentMonthStat: getTotalOrderedProducts(orders),
            todayStat: getTotalOrderedProducts(getTodayOrders(orders)),
            icon: Drumstick
        }
    ]


    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <DashboardNav links={links}/>
                <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <SearchBar/>
                    <AccountSettings shopName={shop?.name}/>
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:p-8">
                <CardStatistics cardData={cardData}/>
                <div className="grid gap-4 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
                    <Card className="xl:col-span-2">
                        <DashboardCardTitle title={'Commandes'}
                                            description={'Commandes récentes de votre restaurant.'}
                                            seeAll={{name: "Voir toutes", link: `/dashboard/${shopId}/orders`}}
                        />
                        <CardContent>
                            {orders && <DashboardTable columns={columns} data={orders.slice(0, 5)}/>}
                        </CardContent>
                    </Card>

                    <LastOrders lastOrders={orders}/>

                </div>
            </main>
        </div>
    )
}
