'use client';
import React, { Suspense } from 'react';
import { SfButton, SfLoaderCircular } from '@storefront-ui/react';
import { useCart } from '@/context/CartContext';
import type { CartItem } from '@/utils/types';
import ProductList from '@/components/ProductList';

export default function CheckoutPage() {

    const { state: cartState } = useCart();

    const getCartTotal = () => {
        let total = 0;
        cartState.cart.forEach((item: CartItem) => {
            total += item.quantity;
        });
        return total;
    };

    const handleSendSale = () => {
        console.log('send sale');
        const fecthData = async () => {
            const response = await fetch('http://localhost:3000/api/sale', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartState.cart),
            });
            const data = await response.json();
            console.log(data);
        };
        fecthData();
    }

    return (
        <main className="min-h-screen bg-gray-100 py-8">
            <ul className="flex flex-col gap-4 items-end max-w-screen-md mx-auto">
                <Suspense fallback={<SfLoaderCircular size="base" />}>
                    {cartState.cart.map((item: CartItem) => (
                        <ProductList key={item.product.id_prod} item={item}/>
                    ))}
                </Suspense>
                <SfButton size="sm" className="w-fit" disabled={getCartTotal() > 0 ? false : true} onClick={handleSendSale}>
                    Checkout
                </SfButton>
            </ul>
            <div className="flex flex-col  gap-4 py-4 max-w-screen-md mx-auto"></div>
        </main>
    );
}