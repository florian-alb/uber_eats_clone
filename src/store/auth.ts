import {User} from "@/types/user.ts";
import {create} from "zustand";
import {jwtDecode, type JwtPayload} from "jwt-decode";
import {getUser, removeUser, setUser} from "@/utils/auth.ts";
import {getUserById} from "@/api/user.ts";
import {logout, refreshToken, signIn} from "@/api/auth.ts";


type AuthStore = {
    user: User | null;
    getProfile: (id: string) => Promise<User>;
    login: (data: Pick<User, 'email' | 'password'>) => Promise<unknown | null>;
    refresh: () => Promise<{ accessToken: string; refreshToken: string }>
    logout: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
    user: getUser(),
    getProfile: (id) => {
        return getUserById(id);
    },
    login: async (data) => {
        try {
            const response = await signIn(data);
            const decodedToken = jwtDecode(response.data.accessToken) as JwtPayload & { id: string };
            const profile = await get().getProfile(decodedToken.id);

            set({user: profile});
            setUser(profile);

            return null;
        } catch (error) {
            return error;
        }
    },
    refresh: async () => {
        return await refreshToken();
    },
    logout: async () => {
        removeUser();
        set({user: null});
        await logout();
    },
}));