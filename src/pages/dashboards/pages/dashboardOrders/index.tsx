import DashboardNav, {DashboardNAvLinks} from "@/pages/dashboards/navbar/components/DashboardNav.tsx";
import AccountSettings from "@/pages/dashboards/navbar/components/AccountSettings.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Shop} from "@/types/shop.ts";
import {Order} from "@/types/order.ts";
import {getShopById} from "@/api/shop.ts";
import {Card, CardContent} from "@/components/ui/card.tsx";
import DashboardCardTitle from "@/pages/dashboards/pages/dashboardHome/components/DashboardCardTitle.tsx";
import DashboardTable, {TableColumn} from "@/pages/dashboards/components/DashboardTable.tsx";
import {formatDate, getFullName, getOrderTotal} from "@/utils/order.ts";
import OrderDetail from "@/pages/dashboards/pages/dashboardOrders/components/OrderDetail.tsx";

export default function DashboardOrders() {
    const {shopId} = useParams()

    const links: DashboardNAvLinks[] = [
        {name: "Tableau de bord", link: `/dashboard/${shopId}`},
        {name: "Produits", link: `/dashboard/${shopId}/products`},
        {name: "Commandes", link: `/dashboard/${shopId}/orders`},
        {name: "Mon Restaurant", link: `/dashboard/${shopId}/settings`}
    ]

    const [shop, setShop] = useState<Shop>()
    const [orders, setOrders] = useState<Order[]>()
    const [orderIndex, setOrdersIndex] = useState<number>(0)

    function handleClick(index?: number) {
        if (!index) {
            setOrdersIndex(0)
        } else {
            setOrdersIndex(index)
        }
    }


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


    useEffect(() => {
        if (!shopId) {
            return
        }
        getShopById(shopId).then(data => {
            setShop(data)
            setOrders(data.orders)
        })
    }, [shopId]);

    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <DashboardNav links={links}/>
                <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    {/*<SearchBar/>*/}
                    <AccountSettings shopName={shop?.name} shopId={shop?.id}/>
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:p-8">

                <div className="grid gap-4 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
                    <Card className="xl:col-span-2">
                        <DashboardCardTitle title={'Commandes'}
                                            description={'Commandes de votre restaurant.'}
                        />
                        <CardContent>
                            {orders && <DashboardTable columns={columns} data={orders}
                                                       onRowClick={(_row, index) => handleClick(index)}/>}
                        </CardContent>
                    </Card>

                    {orders && <OrderDetail order={orders[orderIndex]}/>}

                </div>

            </main>
        </div>
    )
}