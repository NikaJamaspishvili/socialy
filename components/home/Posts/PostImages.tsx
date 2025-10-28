"use client";
import { CldImage } from "next-cloudinary";

const PostImages = ({ images }: { images: string[] }) => {
	return (
		<div>
			{images.map((imagePublicId, index) => (
				<CldImage
					width="400"
					height="300"
					src={imagePublicId}
					className="w-full"
					alt="User image"
					key={index}
					crop="fill"
				/>
			))}
		</div>
	);
};

export default PostImages;
