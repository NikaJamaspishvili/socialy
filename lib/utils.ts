import imageCompression from "browser-image-compression";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function reduceImageSize(image: File) {
	const options = {
		maxSizeMB: 0.5,
		maxWidthOrHeight: 1920,
		useWebWorker: true,
	};

	try {
		const compressedFile = await imageCompression(image, options);

		return compressedFile;
	} catch (error) {
		console.log(error);
		throw new Error("Error while compressing image");
	}
}
