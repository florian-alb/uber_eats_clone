import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {StrictMode} from "react";
import {Toaster} from "@/components/ui/toaster.tsx";
import axios from "axios";
import {refreshToken} from "@/api/auth.ts";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {setUser} from "@/utils/auth.ts";
import {getUserById} from "@/api/user.ts";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 8000;

axios.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status !== 401) return Promise.reject(error);

        if (error.response.status === 401) {
            try {
                const tokens = await refreshToken();
                if (!tokens) {
                    window.location.href = '/auth/login';
                    return Promise.reject(error);
                }

                const decodedToken = jwtDecode(tokens.accessToken) as JwtPayload & { id: string };
                const user = await getUserById(decodedToken.id);
                setUser(user);
                return;
            } catch (error) {
                window.location.href = '/auth/login';
                return Promise.reject(error);
            }
        }
    }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Toaster/>
        <App/>
    </StrictMode>
)
