import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/context/Providers';

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
				<Providers>
                    <Header />
                    {children}
                </Providers>
			</body>
		</html>
	);
}
