import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {StrictMode} from "react";
import axios from "axios";
import {refreshToken} from "@/api/auth.ts";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {setUser} from "@/utils/auth.ts";
import {getUserById} from "@/api/user.ts";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 8000,
    withCredentials: true
});

axiosInstance.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status !== 401) return Promise.reject(error);

        if (error.response.status === 401) {
            try {
                const tokens = await refreshToken();
                if (!tokens) {
                    window.location.href = '/login';
                    return Promise.reject(error);
                }

                const decodedToken = jwtDecode(tokens.accessToken) as JwtPayload & { id: string };
                const user = await getUserById(decodedToken.id);
                setUser(user);
                return;
            } catch (error) {
                window.location.href = '/login';
                return Promise.reject(error);
            }
        }
    }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>
)
