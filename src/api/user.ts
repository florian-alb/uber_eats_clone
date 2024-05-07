import axios from "axios";
import {User} from "@/types/user.ts";

export function getUserById(id: string): Promise<User> {
    return axios.get(`user/${id}`).then(res => res.data)
}

export function getAllUsers(): Promise<User[]> {
    return axios.get(`user`).then(res => res.data)
}

