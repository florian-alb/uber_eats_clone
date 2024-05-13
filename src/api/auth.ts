import {RegisterUser, User} from "@/types/user.ts";
import {axiosInstance} from "@/main.tsx";


export async function register(body: RegisterUser) {
    return axiosInstance.post<User>(`user`, body).then((res) => res.data);
}

export async function signIn(body: Pick<User, 'email' | 'password'>) {
    return await axiosInstance.post<{ accessToken: string; refreshToken: string }>(`auth/sign-in`, body);
}

export async function refreshToken() {
    const res = await axiosInstance
        .post<{ accessToken: string; refreshToken: string; }>(`auth/refresh`, null, );
    return res.data;
}

export async function logout() {
    const res = await axiosInstance.post(`auth/logout`, null, );
    return res.data;
}