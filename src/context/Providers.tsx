'use client';
import { CartProvider } from '@/context/CartContext';
import { ProductProvider } from '@/context/ProductContext';

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ProductProvider>
			<CartProvider>
                {children}
            </CartProvider>
		</ProductProvider>
	);
}
