import {createContext, ReactNode, useContext, useEffect, useState} from "react";

const AuthContext = createContext<{ isLoggedIn: boolean; setIsLoggedIn: (value: boolean) => void } | null>(null);

type AuthProviderProps = {
    children: ReactNode
}

export function AuthProvider({children}: AuthProviderProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {method: 'POST', credentials: "include"})
            .then(response => {setIsLoggedIn(response.status === 200)}
            )
            .catch(error => console.error('Failed to fetch auth status ', error))
        console.log(`${isLoggedIn ? "🔌 user connected" : "❌ user not connected" }`)
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}