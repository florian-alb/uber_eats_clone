import {FormControl, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Form, FormField} from "@/components/ui/form";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import NavbarAuth from "@/components/noLib/NavbarAuth.tsx";

export default function RegisterPage() {
    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
        confirmPassword: z.string()
    }).refine(
        data => data.password === data.confirmPassword,
        {
            message: "Passwords do not match",
            path: ["confirmPassword"]
        }
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    });
    const handleSubmit = () => {
    }

    return (
        <>
        <NavbarAuth />
        <div className="size-full flex justify-center flex-col items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}
                      className="flex flex-col gap-4 px-10 rounded-xl max-w-md w-full">
                    <FormField
                        control={form.control}
                        name={"email"}
                        render={({field}) => {
                            return (
                                <FormItem>
                                    <FormLabel>Email address</FormLabel>
                                    <FormControl className="rounded">
                                        <Input
                                            placeholder={"email"}
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
                                            placeholder={"password"}
                                            type={"password"}
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
                        name={"confirmPassword"}
                        render={({field}) => {
                            return (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl className="rounded">
                                        <Input
                                            placeholder={"confirm password"}
                                            type={"password"}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-800"/>
                                </FormItem>
                            )
                        }}
                    />
                    <Button type="submit" className="bg-ub-dark mt-5 text-white rounded p-2 hover:bg-gray-700   ">Continuer</Button>
                </form>
            </Form>
            <Button className="pt-10">Déjà un compte ?</Button>
        </div>
        </>
    )
}