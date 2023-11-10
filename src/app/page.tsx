'use client';
import { Suspense, useState, useEffect } from 'react';
import { SfLoaderCircular } from '@storefront-ui/react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import AlertPositive from '@/components/AlertPositive';
import type { Product } from '@/utils/types';
import { useCart } from '@/context/CartContext';
import { useProduct } from '@/context/ProductContext';

import dataStore from '@/data/store.json';

export default function HomePage() {
	const { state: cartState, dispatch: cartDispatch } = useCart();
	const { state: productState, dispatch: productDispatch } = useProduct();
	const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);

	const handleAddToCart = (product: Product) => {
		productDispatch({ type: 'DECREMENT_PRODUCT_QUANTITY', payload: { productId: product.id_prod } });
		cartDispatch({ type: 'ADD_TO_CART', payload: { product: product, quantity: 1 } });
		showAlert(1000);
	};

	const showAlert = (time: number) => {
		setIsAlertVisible(true);
		setTimeout(() => {
			setIsAlertVisible(false);
		}, time);
	};

	useEffect(() => {
        if (cartState.cart.length > 0) return;
		const fetchData = async () => {
			productDispatch({ type: 'UPDATE_PRODUCTS', payload: dataStore });
		};

		fetchData();
	}, [productDispatch]);

	return (
		<>
			<main className="min-h-screen bg-gray-100 py-8">
				<div className="flex flex-col gap-4 max-w-screen-md mx-auto">
					<Suspense fallback={<SfLoaderCircular size="base" />}>
						<div className="grid grid-cols-3 gap-4">
							{productState.products.map((product) => (
								<ProductCard
									key={product.id_prod}
									product={product}
									onClick={() => handleAddToCart(product)}
								/>
							))}
						</div>
					</Suspense>
					<div className="fixed bottom-0 left-0 p-4 shadow-md">
						<div
							className={`${
								isAlertVisible ? 'opacity-100' : 'opacity-0'
							} transition-opacity duration-500`}>
							<AlertPositive close={() => setIsAlertVisible(false)} />
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
