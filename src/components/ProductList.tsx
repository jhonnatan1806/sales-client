'use client';
import React from 'react';
import Image from 'next/image';
import { SfButton, SfIconAdd, SfIconRemove } from '@storefront-ui/react';
import { useId, ChangeEvent } from 'react';
import { clamp } from '@storefront-ui/shared';
import type { CartItem } from '@/utils/types';
import { useCart } from '@/context/CartContext';

export default function ProductList({ item }: { item: CartItem }) {
	const inputId = useId();

	return (
		<li className="flex gap-4 items-center w-full p-4 rounded-md shadow-sm bg-white">
			<Image
				src={item.product.image}
				alt={item.product.name_prod}
				className="object-contain h-auto rounded-md aspect-square"
				width="64"
				height="64"
			/>
			<p className="flex-grow text-sm line-clamp-2">{item.product.name_prod}</p>
			<p className="text-lg font-bold">${item.product.price}</p>
			<div className="flex">
				<SfButton
					variant="tertiary"
					square
					className="rounded-r-none"
					disabled={true}
					aria-controls={inputId}
					aria-label="Decrease value">
					<SfIconRemove />
				</SfButton>
				<input
					id={inputId}
					type="number"
					role="spinbutton"
					className="appearance-none mx-2 w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
					value={item.quantity}
                    readOnly
				/>
				<SfButton
					variant="tertiary"
					square
					className="rounded-l-none"
					disabled={true}
					aria-controls={inputId}
					aria-label="Increase value">
					<SfIconAdd />
				</SfButton>
			</div>
		</li>
	);
}
