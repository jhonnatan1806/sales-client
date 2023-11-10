import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import { ProductProvider } from '@/context/ProductContext';

import './globals.css';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Store Virtual',
	description: 'VueStoreFront + Next.js = ❤️',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="overflow-y-scroll">
				<ProductProvider>
					<CartProvider>
						<Header />
						{children}
					</CartProvider>
				</ProductProvider>
			</body>
		</html>
	);
}
