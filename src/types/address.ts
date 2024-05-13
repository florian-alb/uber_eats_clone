export type Address = {
    id: string | undefined;
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
    suggestions: Array<AddressSuggestion>
}

export type MapboxAddressConversion = {
    features: Array<{
        properties:
            { full_address: string }
    }>
}