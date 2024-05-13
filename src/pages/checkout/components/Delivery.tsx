import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {ChangeEvent} from "react";


export default function DeliveryForm({changeHandler}: {changeHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void}) {
    return (
        <div className="w-2/3">
            <div>
                <h1 className="text-2xl font-bold">Delivery Details</h1>
                <p className="text-gray-500">Enter your information to complete your order.</p>
            </div>
            <div className="space-y-4 mt-5">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" onChange={changeHandler} required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" onChange={changeHandler} required/>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="123 Main St" onChange={changeHandler} required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="San Francisco" onChange={changeHandler} required/>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="zip">Zip Code</Label>
                        <Input id="zip" placeholder="94103" onChange={changeHandler} required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="instructions">Delivery Instructions</Label>
                        <Textarea id="instructions" onChange={changeHandler} placeholder="Leave at front door" />
                    </div>
                </div>
            </div>
    )
}