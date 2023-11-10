export type Product = {
    id_prod: string;
    name_prod: string;
    description: string;
    unit: string;
    price: number;
    quantity: number;
    image: string;
}

export type CartItem = {
    product: Product;
    quantity: number;
}