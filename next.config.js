/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['@storefront-ui/react'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'm.media-amazon.com',
				pathname: '**',
			},
		],
	},
};

module.exports = nextConfig;
