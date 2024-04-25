"use client"
import {Form} from "@/components/ui/form.tsx";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button.tsx";
import NavbarAuth from "@/components/NavbarAuth.tsx";
import {Link} from "react-router-dom";

export default function LoginForm() {

    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
        confirmPassword: z.string()
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    });
    const handleSubmit = () => {
        //TODO: handle the submit
    }

    return (
        <>
        <NavbarAuth />
        <div className="h-full flex justify-center flex-col items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}
                      className="flex flex-col gap-4 px-5 rounded-xl max-w-md w-full">
                    <FormField
                        control={form.control}
                        name={"email"}
                        render={({field}) => {
                            return (
                                <FormItem>
                                    <FormLabel>Email address</FormLabel>
                                    <FormControl className="rounded">
                                        <Input
                                            placeholder="Email"
                                            type={"email"}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-800"/>
                                </FormItem>
                            )
                        }}
                    />

                    <FormField
                        control={form.control}
                        name={"password"}
                        render={({field}) => {
                            return (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl className="rounded">
                                        <Input
                                            placeholder="Password"
                                            type={"password"}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-800"/>
                                </FormItem>
                            )
                        }}
                    />
                    <Button type="submit"
                            className="bg-ub-dark text-white rounded-md hover:bg-gray-800 mt-5">Continuer</Button>
                </form>
            </Form>
            <Button asChild className="pt-10"><Link to='/register'>Créer un compte</Link></Button>
        </div>
        </>
    )
}

