import {
    BadgeEuro
} from "lucide-react"

import {
    Card, CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {Order} from "@/types/order.ts";
import {formatDate, getFullName, getOrderTotal, getQuantity} from "@/utils/order.ts";

export default function OrderDetail({order}: { order: Order }) {

    function getProducts(order: Order) {
        const products: {
            name: string;
            quantity: number
        }[] = []
        getQuantity(order)?.forEach((value, key) => {
            products.push(
                {
                    name: key,
                    quantity: value
                }
            )
        })
        return products
    }

    function getProductPrice(productName: string, order: Order): number {
        const orderProduct = order.orderProducts.find(op => op.product.name === productName);
        return orderProduct ? orderProduct.product.price : 0;
    }
    const products = getProducts(order)

    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                        Commande {order.id}
                    </CardTitle>
                    <CardDescription>Date: {formatDate(order.createdAt)}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                    <div className="font-semibold">Détails de la commande</div>
                    <ul className="grid gap-3">
                        {
                            products.map((product, index) => (
                                <li key={index} className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        {product.name} x <span>{product.quantity}</span>
                                    </span>
                                    <span>€{product.quantity * getProductPrice(product.name, order)}</span>
                                </li>
                            ))
                        }
                    </ul>
                    <Separator className="my-2"/>
                    <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Soustotal</span>
                            <span>€{`${getOrderTotal(order)}`}</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Frais de services</span>
                            <span>€2.50</span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                            <span className="text-muted-foreground">Total</span>
                            <span>€{`${getOrderTotal(order) + 2.5}`}</span>
                        </li>
                    </ul>
                </div>
                <Separator className="my-4"/>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <div className="font-semibold">Informations d'expédition</div>
                        <address className="grid gap-0.5 not-italic text-muted-foreground">
                            <span>{getFullName(order)}</span>
                            <span>{order.deliveryAddress.address}</span>
                        </address>
                    </div>
                </div>
                <Separator className="my-4"/>
                <div className="grid gap-3">
                    <div className="font-semibold">Informations client</div>
                    <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Client</dt>
                            <dd>{getFullName(order)}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Email</dt>
                            <dd>
                                <a href="mailto:">{order.customer.email}</a>
                            </dd>
                        </div>
                    </dl>
                </div>
                <Separator className="my-4"/>
                <div className="grid gap-3">
                    <div className="font-semibold">Mode de paiement</div>
                    <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <dt className="flex items-center gap-1 text-muted-foreground">
                                <BadgeEuro className="h-4 w-4"/>
                                Balance
                            </dt>
                        </div>
                    </dl>
                </div>
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                    Mise à jour le <time>{formatDate(order.createdAt)}</time>
                </div>
            </CardFooter>
        </Card>
    )
}
