import {User} from "@/types/user.ts";

export function setUser(user: Omit<User, 'password'> | null) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function getUser() {
    const user = localStorage.getItem('user');
    if (user) return JSON.parse(user);
    return null;
}

export function removeUser() {
    localStorage.removeItem('user');
}