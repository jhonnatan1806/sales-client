'use client';
import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';
import { CartItem } from '@/utils/types';

type CartState = {
	cart: CartItem[];
};

type CartAction = { type: 'ADD_TO_CART'; payload: CartItem } | { type: 'REMOVE_FROM_CART'; payload: string };

const CartContext = createContext<{ state: CartState; dispatch: Dispatch<CartAction> } | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
	switch (action.type) {
		case 'ADD_TO_CART':
			const existingCartItem = state.cart.find((item) => item.product.id_prod === action.payload.product.id_prod);

			if (existingCartItem) {
				return {
					...state,
					cart: state.cart.map((item) =>
						item.product.id_prod === action.payload.product.id_prod
							? { ...item, quantity: item.quantity + 1 }
							: item
					),
				};
			} else {
				return {
					...state,
					cart: [...state.cart, { product: action.payload.product, quantity: 1 }],
				};
			}
		case 'REMOVE_FROM_CART':
			return {
				...state,
				cart: state.cart.filter((item) => item.product.id_prod !== action.payload),
			};
		default:
			return state;
	}
};

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, { cart: [] });
	return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};

export { CartProvider, useCart };
