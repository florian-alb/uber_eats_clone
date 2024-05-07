import axios from "axios";
import {} from "@/types/user.ts";
import {Address} from "@/types/address.ts";

export async function addAddress(body: Address) {
    return axios.post<Address>('address', body).then((res) => res.data);
}

