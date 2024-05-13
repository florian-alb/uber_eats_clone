import {Button} from "@/components/ui/button.tsx"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import {Input} from "@/components/ui/input.tsx"
import {useEffect} from "react";
import {useQuery} from "@/lib/utils.ts";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {User} from "@/types/user.ts";
import {useAuthStore} from "@/store/auth.ts";
import {errorMessages} from "@/utils/errorMessages.ts";
import {useToast} from "@/components/ui/use-toast.ts";
import {Link, useNavigate} from "react-router-dom";
import {Label} from "@/components/ui/label.tsx";

export function LoginForm() {
    const navigate = useNavigate()
    const {toast} = useToast()
    const query = useQuery();
    const queryParam = ""

    const {login} = useAuthStore();

    useEffect(() => {
        const queryParam = query.get("status");
        if (queryParam === "user-created") {
            toast({
                title: "Compte créé avec succès",
                description: "Veuillez vous connecter avec votre Email et Mot de passe."
            })
        }
    }, [query, queryParam])

    const onSubmit: SubmitHandler<Pick<User, 'email' | 'password'>> = async (data) => {
        const response = await login(data);

        if (response) {
            return toast({
                variant: "destructive",
                title: "Erreur",
                description: errorMessages.invalid_credentials
            })
        } else {
            navigate("/")
        }
    };

    const {control, handleSubmit} = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    return (
        <>
            <div className={"flex flex-col justify-center items-center"}>
                <Card className="w-full max-w-sm rounded">
                    <CardHeader>
                        <CardTitle className="text-2xl">Connection</CardTitle>
                        <CardDescription>
                            Saisissez votre Email et mot de passe ci-dessous pour vous connecter à votre compte.
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmit)} method="POST">
                        <CardContent className="grid gap-4">
                            <Label htmlFor="email">Email</Label>
                            <Controller
                                name="email"
                                control={control}
                                rules={{required: errorMessages.required_email}}
                                render={({field}) => <Input id="email" placeholder="Email" {...field}/>}
                            />
                            <Label htmlFor="password">Mot de passe</Label>
                            <Controller
                                name="password"
                                control={control}
                                rules={{required: errorMessages.required_password}}
                                render={({field}) => (
                                    <Input id="password" type="password" placeholder="Mot de passe" {...field}/>
                                )}
                            />
                        </CardContent>
                        <CardFooter className={"flex flex-col"}>
                            <Button type="submit" className="w-full bg-black text-white rounded hover:bg-black/80">Se
                                Connecter</Button>
                            <div className="mt-4 text-center text-sm">
                                Pas encore de compte?{" "}
                                <Link to="/register" className="underline">
                                    En créer un !
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </>
    )
}
