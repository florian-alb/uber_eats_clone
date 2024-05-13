import NavbarAuth from "@/components/NavbarAuth.tsx";
import DeliveryForm from "@/pages/checkout/components/Delivery.tsx";
import PaymentForm from "@/pages/checkout/components/Payment.tsx";
import ProductsInfos from "@/pages/checkout/components/ProductsInfos.tsx";
import {Button} from "@/components/ui/button.tsx";
import {atom} from "jotai/index";
import {Item} from "@/components/Navbar.tsx";
import {useAtom} from "jotai";
import {ChangeEvent, FormEvent, useState} from "react";


export const cartAtom = atom(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') as string) : [] as Item[])

export default function Checkout() {
    const [items, ] = useAtom(cartAtom)

    const [formValues, setFormValues] = useState({
        delivery: {
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            zip: '',
            instructions: '',
        },
        payment: {
            wallet: false,
        }
    })

    function retrieveCardPrice(){
        let totalPrice: number = 0
        for (let i = 0; i < items.length;i++) {
            totalPrice += parseFloat(items[i].price)
        }
        return totalPrice
    }

    function retrieveTotalPrice(){
        return retrieveCardPrice() + 2.5
    }


    function changeHandler(e: ChangeEvent<HTMLInputElement |  HTMLTextAreaElement>){
        setFormValues({
            ...formValues,
            delivery: {
                ...formValues.delivery,
                [e.target.id]: e.target.value
            },
        })
        console.log(formValues.delivery)
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        console.log(formValues.delivery)
        //TODO: Verify the Wallet of the user
    }

    return (
        <div className="size-full">
            <NavbarAuth/>
            <div className="size-full flex">
                <form className="w-2/3 min-w-[500px]" id="checkout-form" onSubmit={handleSubmit}>
                    <div className="translate-y-12 w-full flex items-center gap-10 flex-col">
                        <DeliveryForm changeHandler={changeHandler}/>
                        <PaymentForm />
                    </div>
                </form>
                    <div className="flex w-1/3 pl-5 pt-5 flex-col shadow-xl border">
                        <h1 className="text-2xl font-bold">Products Informations</h1>
                        <p className="text-gray-500">Here is the list of all the products you ordered</p>
                        <div className="my-5 flex gap-3 flex-col border-b pb-5">
                            <ProductsInfos/>
                        </div>
                        <div className="flex mr-5 flex-col">
                            <p className="text-gray-500">Sous-Total: {retrieveCardPrice()}€</p>
                            <p className="text-gray-500">Frais de Livraison: 2.5€</p>
                            <div className="flex text-xl pt-3 mt-5 mr-2 gap-1 border-t">
                                Total:
                                <h1 className="text-xl font-bold">{retrieveTotalPrice()}€</h1>
                            </div>
                        </div>
                        <Button type="submit" form="checkout-form" className="w-4/5 mt-10 h-14 mx-auto relative bg-ub-dark hover:bg-gray-800 border rounded-lg">Commander</Button>
                    </div>
            </div>
        </div>
    )

}

