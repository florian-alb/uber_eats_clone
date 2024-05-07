import {RegisterUser, User} from "@/types/user.ts";
import axios from 'axios';


export async function register(body: RegisterUser) {
    return axios.post<User>(`user`, body).then((res) => res.data);
}

export async function signIn(body: Pick<User, 'email' | 'password'>) {
    return await axios.post<{ accessToken: string; refreshToken: string }>(`auth/sign-in`, body);
}

export async function refreshToken() {
    const res = await axios
        .post<{ accessToken: string; refreshToken: string; }>(`auth/refresh`, null, );
    return res.data;
}

export async function logout() {
    const res = await axios.post(`auth/logout`, null, );
    return res.data;
}