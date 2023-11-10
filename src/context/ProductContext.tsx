'use client';
import React, { createContext, useContext, ReactNode, useReducer } from 'react';
import { Product } from '@/utils/types';

type ProductState = {
	products: Product[];
};

type ProductAction =
	| { type: 'UPDATE_PRODUCTS'; payload: Product[] }
    | { type: 'INCREMENT_PRODUCT_QUANTITY'; payload: { productId: string } }
	| { type: 'DECREMENT_PRODUCT_QUANTITY'; payload: { productId: string } };

const ProductContext = createContext<{ state: ProductState; dispatch: React.Dispatch<ProductAction> } | undefined>(
	undefined
);

const productReducer = (state: ProductState, action: ProductAction): ProductState => {
	switch (action.type) {
		case 'UPDATE_PRODUCTS':
			return {
				...state,
				products: action.payload,
			};
        case 'INCREMENT_PRODUCT_QUANTITY':
            return {
                ...state,
                products: state.products.map((product) =>
                    product.id_prod === action.payload.productId
                        ? { ...product, quantity: product.quantity + 1 }
                        : product
                ),
            };
		case 'DECREMENT_PRODUCT_QUANTITY':
			return {
				...state,
				products: state.products.map((product) =>
					product.id_prod === action.payload.productId
						? { ...product, quantity: Math.max(0, product.quantity - 1) }
						: product
				),
			};
		default:
			return state;
	}
};

const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(productReducer, { products: [] });

	return <ProductContext.Provider value={{ state, dispatch }}>{children}</ProductContext.Provider>;
};

const useProduct = () => {
	const context = useContext(ProductContext);
	if (!context) {
		throw new Error('useProduct must be used within a ProductProvider');
	}
	return context;
};

export { ProductProvider, useProduct };
