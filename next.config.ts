import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**", // matches any domain
				port: "", // optional, leave empty for default
				pathname: "/**", // allow any path
			},
		],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: "5mb",
		},
	},
};

export default nextConfig;
