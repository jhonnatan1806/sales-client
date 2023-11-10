import Image from 'next/image';
import { SfButton, SfLink, SfIconShoppingCart, SfIconFavorite } from '@storefront-ui/react';
import { Product } from '@/utils/types';

export default function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
	return (
		<div className="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px] cursor-pointer bg-white">
			<div className="relative">
				<div className="block">
					<Image
						src={product.image}
						alt={product.name_prod}
						className="object-contain h-auto rounded-md aspect-square"
						width="300"
						height="300"
					/>
				</div>
				<SfButton
					variant="tertiary"
					size="sm"
					square
					className="absolute bottom-0 right-0 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full"
					aria-label="Add to wishlist">
					<SfIconFavorite size="sm" />
				</SfButton>
			</div>
			<div className="p-4 border-t border-neutral-200">
				<p className="font-normal text-sm line-clamp-2 text-neutral-700">{product.name_prod}</p>
				<span className="block pb-2 font-bold text-lg">$ {product.price}</span>
				<SfButton
					size="sm"
					slotPrefix={<SfIconShoppingCart size="sm" />}
					onClick={onClick}
					disabled={product.quantity > 0 ? false : true}>
					Add to cart
				</SfButton>
			</div>
		</div>
	);
}
