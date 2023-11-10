'use client';
import React, { Suspense } from 'react';
import Image from 'next/image';
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

	return (
		<main className="min-h-screen bg-gray-100 py-8">
			<ul className="flex flex-col gap-4 items-end max-w-screen-md mx-auto">
				<Suspense fallback={<SfLoaderCircular size="base" />}>
					{cartState.cart.map((item: CartItem) => (
						<ProductList key={item.product.id_prod} item={item}/>
					))}
				</Suspense>
				<SfButton size="sm" className="w-fit" disabled={getCartTotal() > 0 ? false : true}>
					Checkout
				</SfButton>
			</ul>
			<div className="flex flex-col  gap-4 py-4 max-w-screen-md mx-auto"></div>
		</main>
	);
}
