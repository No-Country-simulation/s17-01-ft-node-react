export interface Plans {
    id:          number;
    name:        string;
    description: string;
    quantity:    number;
    price:       number;
    tiers:       string[];
}