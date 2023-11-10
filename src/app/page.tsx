'use client';
import { Suspense, useState, useEffect } from 'react';
import { SfButton, SfLoaderCircular, SfIconPublishedWithChanges } from '@storefront-ui/react';
import ProductCard from '@/components/ProductCard';
import AlertPositive from '@/components/AlertPositive';
import type { Product } from '@/utils/types';
import { useCart } from '@/context/CartContext';
import { useProduct } from '@/context/ProductContext';

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

    const handleGetProducts = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/store/');
            if (response.ok) {
                const data = await response.json();
                productDispatch({ type: 'UPDATE_PRODUCTS', payload: JSON.parse(data.message)})
            } else {
                console.error('Error:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
/*
	useEffect(() => {
        if (cartState.cart.length > 0) return;
		const fetchData = async () => {
			try {
				const response = await fetch('http://localhost:3000/api/store/');
				if (response.ok) {
					const data = await response.json();
                    productDispatch({ type: 'UPDATE_PRODUCTS', payload: JSON.parse(data.message)})
				} else {
					console.error('Error:', response.status, response.statusText);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, [productState.products]);*/

	return (
		<>
			<main className="min-h-screen bg-gray-100 py-8">
				<div className="flex flex-col items-end gap-4 max-w-screen-md mx-auto">
                    <SfButton onClick={handleGetProducts} className='w-fit'> < SfIconPublishedWithChanges/>Get Products</SfButton>
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
