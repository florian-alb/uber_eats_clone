import axios from "axios";
import {Address, MapboxAddressConversion, MapboxAddressSuggestion} from "@/types/address.ts";
import {axiosInstance} from "@/main.tsx";
import {getUserById} from "@/api/user.ts";

export async function addAddress(body: Address, userId?: string) {
    console.log(body)
    if (userId) {
        const user = await getUserById(userId);
        if (!user) {
            throw new Error(`User with id ${userId} do not exist`)
        }
    }
    body = {...body, userId: userId}
    return axiosInstance.post<Address>(`address/${body.id}`, body).then((res) => res.data);
}

export async function convertAddress(position: GeolocationPosition): Promise<MapboxAddressConversion> {
    return axios.get("https://api.mapbox.com/search/geocode/v6/reverse?", {
        params: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            access_token: import.meta.env.VITE_MAPBOX_TOKEN
        }
    })
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching Mapbox suggestions:', error);
            throw error;
        });
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