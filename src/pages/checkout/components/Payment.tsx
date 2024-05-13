import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs.tsx"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card.tsx"
import { Label } from "@/components/ui/label.tsx"
import { Input } from "@/components/ui/input.tsx"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select.tsx"
import {SVGProps} from "react";

export default function PaymentForm() {
    return (
        <Tabs className="w-3/4" defaultValue="credit-card">
            <TabsList className="grid w-full grid-cols-2 gap-4">
                <TabsTrigger
                    className="inline-flex h-12 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    id="credit-card"
                    value="credit-card"
                >
                    <CreditCardIcon className="mr-2 h-5 w-5" />
                    Credit Card
                </TabsTrigger>
                <TabsTrigger
                    className="inline-flex h-12 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    id="wallet"
                    value="wallet"
                >
                    <WalletCardsIcon className="mr-2 h-5 w-5" />
                    Wallet
                </TabsTrigger>
            </TabsList>
            <TabsContent value="credit-card">
                <Card className="">
                    <CardHeader>
                        <CardTitle>Payment Method</CardTitle>
                        <CardDescription>Add a new payment method to your account.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="First Last" disabled/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="number">Card number</Label>
                            <Input id="number" placeholder="" disabled/>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="month">Expires</Label>
                                <Select>
                                    <SelectTrigger id="month" disabled>
                                        <SelectValue placeholder="Month"  />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">January</SelectItem>
                                        <SelectItem value="2">February</SelectItem>
                                        <SelectItem value="3">March</SelectItem>
                                        <SelectItem value="4">April</SelectItem>
                                        <SelectItem value="5">May</SelectItem>
                                        <SelectItem value="6">June</SelectItem>
                                        <SelectItem value="7">July</SelectItem>
                                        <SelectItem value="8">August</SelectItem>
                                        <SelectItem value="9">September</SelectItem>
                                        <SelectItem value="10">October</SelectItem>
                                        <SelectItem value="11">November</SelectItem>
                                        <SelectItem value="12">December</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="year" >Year</Label>
                                <Select>
                                    <SelectTrigger id="year" disabled>
                                        <SelectValue placeholder="Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2024">2024</SelectItem>
                                        <SelectItem value="2025">2025</SelectItem>
                                        <SelectItem value="2026">2026</SelectItem>
                                        <SelectItem value="2027">2027</SelectItem>
                                        <SelectItem value="2028">2028</SelectItem>
                                        <SelectItem value="2029">2029</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input id="cvc" placeholder="CVC" disabled/>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="wallet">
                <Card className="max-w-full">
                    <CardHeader>
                        <CardTitle>Payment Method</CardTitle>
                        <CardDescription>Add a new payment method to your account.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="First Last" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="number">Wallet Address</Label>
                            <Input id="number" placeholder="" />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}

function CreditCardIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
    )
}


function WalletCardsIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
            <path d="M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21" />
        </svg>
    )
}