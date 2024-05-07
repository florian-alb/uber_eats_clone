import axios from "axios";
import {Category} from "@/types/category.ts";

export async function getCategories(): Promise<Category[]> {
    return axios.get<Category[]>(`category`, ).then((res) => res.data);
}