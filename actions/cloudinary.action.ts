"use server";

import { prisma } from "@/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file: File, subFolder: string) {
	let arrayBuffer = await file.arrayBuffer();
	let buffer = new Uint8Array(arrayBuffer);

	try {
		const public_id = await new Promise<string>((resolve, reject) => {
			cloudinary.uploader
				.upload_stream({ folder: `social_media/${subFolder}` }, (error, result) => {
					if (error) {
						reject(error);
					} else {
						if (result) resolve(result.public_id);
						reject("uploading image didn't return result");
					}
				})
				.end(buffer);
		});
		return public_id;
	} catch (err) {
		console.log(err);
		throw new Error("image upload to cloudinary failed");
	}
}

export async function uploadNewPost(files: File[], userId: string, description: string) {
	try {
		const imagePublicIds = await Promise.all(
			files.map(async (file) => {
				const public_id = await uploadImage(file, "posts");
				return public_id;
			}),
		);

		await prisma.posts.create({
			data: {
				userId: userId,
				description: description,
				images: imagePublicIds,
			},
		});

		revalidatePath("/");
		return { status: true };
	} catch (err) {
		console.log(err);
		throw new Error("Error Has Appeared While Uploading Post");
	}
}

// export async function deleteImage(publicId) {
// 	cloudinary.api
// 		.delete_resources(publicId)
// 		.then((result) => console.log(result))
// 		.catch((err) => {
// 			console.log(err);
// 			throw new Error("Error while deleting image from cloudinary");
// 		});
// }
