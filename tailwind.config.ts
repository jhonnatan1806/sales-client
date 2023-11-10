import type { Config } from 'tailwindcss';
const { tailwindConfig } = require('@storefront-ui/react/tailwind-config');

const config: Config = {
	presets: [tailwindConfig],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@storefront-ui/react/**/*.{js,mjs}',
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
export default config;
