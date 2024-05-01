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
import {Label} from "@/components/ui/label.tsx"
import {useState} from "react";

export function LoginForm() {
    const [errorText, setErrorText] = useState(null)

    const handleSubmit = (e: any): void => {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);

        fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/sign-in`,
            {
                method: 'POST',
                body: formData,
                credentials: 'include' // This is necessary for cookies to be sent and received
            }
        ).then(response => {
            if (response.status === 200){
                console.log("logged in")
                window.location.href = "/"
            }
            return response.json();
        }).then(data => {
            setErrorText(data.message);
        }).catch(error => {
            console.error("Error logging in:", error);
        });
    }

    return (
        <Card className="w-full max-w-sm rounded">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit} method="POST">
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input className={"rounded border-gray-300 placeholder:text-gray-400"} id="email" name="email"
                               type="email"
                               placeholder="m@example.com" required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input className={"rounded border-gray-300"} id="password" name="password" type="password"
                               required/>
                        {errorText && <p className={"text-sm text-red-400"}>{errorText}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full bg-black text-white rounded">Sign in</Button>
                </CardFooter>
            </form>
        </Card>
    )
}
