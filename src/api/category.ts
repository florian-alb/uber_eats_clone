import {Category} from "@/types/category.ts";
import {axiosInstance} from "@/main.tsx";

export async function getCategories(): Promise<Category[]> {
    return axiosInstance.get<Category[]>(`category`, ).then((res) => res.data);
}