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
import {Link} from "react-router-dom";
import {FormEvent, useState} from "react";

export function RegisterForm() {
    const [errorText, setErrorText] = useState(null)

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form);

        console.log("formData", Object.fromEntries(formData.entries()));

        fetch(`${import.meta.env.VITE_API_BASE_URL}/user/`,
            {
                method: 'POST',
                body: formData,
                credentials: 'include'
            }
        ).then(response => {
            if (response.status === 201){
                window.location.href = "/login?status=user-created"
            }
            return response.json();
        }).then(data => {
            setErrorText(data.message);
        }).catch(error => {
            console.error("Error signing up in:", error);
        });
    }

    return (
        <Card className="mx-auto max-w-sm rounded">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit} method="POST">
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input id="first-name" name="firstName" placeholder="Ad" required/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input id="last-name" name="lastName" placeholder="Laurent" required/>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="email@de-malade.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password"/>
                        </div>
                        <Button type="submit" className="w-full">
                            Create an account
                        </Button>
                    </div>
                    {errorText && <p className={"text-sm text-red-400 my-2 text-center"}>{errorText}</p>}
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </form>
        </Card>
    )
}
