import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";
import {Order} from "@/types/order.ts";
import {getInitials, getOrderTotal} from "@/utils/order.ts";

export default function LastOrders({lastOrders}: { lastOrders?: Order[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Dernières ventes</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">

                {
                    lastOrders?.map((order, index) => {
                        return (
                            <div key={index} className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarFallback>{getInitials(index, lastOrders)}</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        {`${order.customer.firstName} ${order.customer.lastName}`}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {order.customer.email}
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">+{getOrderTotal(lastOrders[index])}€</div>
                            </div>
                        )
                    })
                }
            </CardContent>
        </Card>
    )
}