"use client";
import { CldImage } from "next-cloudinary";

const PostImages = ({ images }: { images: string[] }) => {
	return (
		<div
			className={`grid ${images.length > 2 ? "grid-cols-2" : images.length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-3`}
		>
			{images.map((imagePublicId, index) => (
				<CldImage
					width="400"
					height="300"
					src={imagePublicId}
					className={`w-full ${index === 2 && "col-span-2"}`}
					alt="User image"
					key={index}
					crop="fill"
				/>
			))}
		</div>
	);
};

export default PostImages;
