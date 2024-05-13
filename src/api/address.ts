import axios from "axios";
import {Address, MapboxAddressSuggestion} from "@/types/address.ts";
import {axiosInstance} from "@/main.tsx";

export async function addAddress(body: Address) {
    return axiosInstance.post<Address>('address', body).then((res) => res.data);
}

export async function mapboxSuggestions(searchTerm: string): Promise<MapboxAddressSuggestion> {
    return axios.get(`https://api.mapbox.com/autofill/v1/suggest/${searchTerm}?`,
        {
            params:
                {
                    types: "address",
                    access_token: import.meta.env.VITE_MAPBOX_TOKEN,
                    streets: "true",
                    language: "fr",
                    session_token: '0f28a859-ef4e-4791-88f6-d9dbdd70c232',
                    proximity: "ip"
                }
        }
    ).then(res => res.data)
        .catch(error => {
            console.error('Error fetching Mapbox suggestions:', error);
            throw error;
        });
}