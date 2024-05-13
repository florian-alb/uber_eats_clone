export type Address = {
    id: string;
    name: string;
    address: string;
    userId: string | undefined
}

export type AddressSuggestion = {
    address_line1: string
    place: string,
    postcode: string,
    country: string,
}

export type MapboxAddressSuggestion = {
    suggestions : Array<AddressSuggestion>
}