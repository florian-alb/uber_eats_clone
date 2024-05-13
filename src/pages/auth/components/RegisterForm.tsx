import {Button} from "@/components/ui/button.tsx"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Label} from "@/components/ui/label.tsx"
import {Link, useNavigate} from "react-router-dom";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {RegisterUser} from "@/types/user.ts";
import {errorMessages} from "@/utils/errorMessages.ts";
import {patterns} from "@/utils/patterns.ts";
import {register} from "@/api/auth.ts";
import {toast} from "@/components/ui/use-toast.ts";

export function RegisterForm() {
    const navigate = useNavigate()

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
        },
    });

    const onSubmit: SubmitHandler<RegisterUser> = async data => {
        await register(data)
            .then(() => navigate("/login?status=user-created"))
            .catch(
                (error) => {
                    console.error(error);
                    toast({
                        variant: "destructive",
                        title: "Erreur",
                        description: errorMessages.user_already_exists
                    })
                }
            )
    };

    return (
        <Card className="mx-auto max-w-sm rounded">
            <CardHeader>
                <CardTitle className="text-xl">Création de compte</CardTitle>
                <CardDescription>
                    Saisissez vos informations pour créer un compte
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)} method="POST">
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="firstName">Prénom</Label>
                                <Controller
                                    name="firstName"
                                    control={control}
                                    rules={{
                                        required: errorMessages.first_name_pattern,
                                        pattern: {value: patterns.first_name, message: errorMessages.first_name_pattern}
                                    }}
                                    render={({field}) =>
                                        <Input type="text" id="first-name" placeholder="Adrien" {...field} />}
                                />
                                {errors.firstName && (
                                    <span className="text-red-500 text-xs">{errors.firstName.message}</span>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Nom</Label>
                                <Controller
                                    name="lastName"
                                    control={control}
                                    rules={{
                                        required: errorMessages.required_last_name,
                                        pattern: {value: patterns.last_name, message: errorMessages.last_name_pattern}
                                    }}
                                    render={({field}) =>
                                        <Input type="text" id="last-name" placeholder="Laurent" {...field} />}
                                />
                                {errors.lastName && (
                                    <span className="text-red-500 text-xs">{errors.lastName.message}</span>
                                )}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: errorMessages.required_email,
                                    pattern: {value: patterns.email, message: errorMessages.email_pattern}
                                }}
                                render={({field}) =>
                                    <Input id="email" placeholder="email@de-malade.com" {...field} />}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-xs">{errors.email.message}</span>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Controller
                                name="password"
                                control={control}
                                rules={{
                                    required: errorMessages.required_password,
                                    minLength: {value: 8, message: errorMessages.password_length},
                                    pattern: {value: patterns.password, message: errorMessages.password_pattern}
                                }}
                                render={({field}) =>
                                    <Input type="password" id="password" {...field} />}
                            />
                            {errors.password && (
                                <span className="text-red-500 text-xs">{errors.password.message}</span>
                            )}
                        </div>
                        <Button type="submit" className="w-full">
                            Créer un compte
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Déja un compte?{" "}
                        <Link to="/login" className="underline">
                            Se connecter
                        </Link>
                    </div>
                </CardContent>
            </form>
        </Card>
    )
}
