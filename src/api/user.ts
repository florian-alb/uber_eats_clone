import {User} from "@/types/user.ts";
import {axiosInstance} from "@/main.tsx";

export function getUserById(id: string): Promise<User> {
    return axiosInstance.get(`user/${id}`).then(res => res.data)
}

export function getAllUsers(): Promise<User[]> {
    return axiosInstance.get(`user`).then(res => res.data)
}