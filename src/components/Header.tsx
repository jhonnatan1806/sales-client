'use client'
import Link from 'next/link';
import { SfBadge, SfIconShoppingCart, SfIconVuestorefront } from '@storefront-ui/react';
import { useCart } from '@/context/CartContext';
import type { CartItem } from '@/utils/types';

export default function Header() {
	const { state:cartState } = useCart();

	const getCartTotal = () => {
		let total = 0;
		cartState.cart.forEach((item: CartItem) => {
			total += item.quantity;
		});
		return total;
	};

	return (
		<header className="drop-shadow-sm bg-white">
			<nav className="flex justify-between items-center max-w-screen-md mx-auto h-14">
				<Link href={'/'} className="flex gap-4 text-primary-600">
					<SfIconVuestorefront />
					<p className="font-semibold">Vue StoreFront</p>
				</Link>
				<Link  href={'/checkout'} className="relative w-fit">
					<SfIconShoppingCart className='text-primary-600'/>
					<SfBadge content={getCartTotal()} max={9} />
				</Link>
			</nav>
		</header>
	);
}
