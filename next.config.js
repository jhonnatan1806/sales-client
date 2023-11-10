/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['@storefront-ui/react'],
	images: {
		domains: ['m.media-amazon.com'],
	},
};

module.exports = nextConfig;
