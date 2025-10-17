"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useRef, useState } from "react";
import { Sparkles, X } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

function CreatePost() {
	const imageInputRef = useRef<HTMLInputElement | null>(null);
	const [textArea, setTextArea] = useState("");
	const [images, setImages] = useState<string[]>([]);

	const handleImageFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
		const imageFiles = e.target.files;
		if (!imageFiles) return;

		for (const imageFile of imageFiles) {
			const allowedExtestions = ["image/png", "image/jpeg", "image/jpg"];
			const isFileValidImage = allowedExtestions.some((ext) => ext === imageFile.type);

			if (isFileValidImage) {
				setImages((prev) => {
					const array = [...prev];
					array.push(URL.createObjectURL(imageFile));
					return array;
				});
			}
		}
	};

	const handleSubmit = () => {};

	return (
		<Card className="border mx-auto w-1/2 p-3">
			<div className="flex gap-3 items-center">
				<Avatar className="mb-auto w-[70px] h-full">
					<AvatarImage
						src={
							"https://scontent.ftbs5-3.fna.fbcdn.net/v/t39.30808-6/456557319_1983041078820065_7542496239843671656_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=MWJ_IIum5vMQ7kNvwEVBbca&_nc_oc=AdnG6nDhKm5Q0MQ6iMFSfV62Hskan1yf64QTC1WI-WK0OeYycGRr55eEH-fSLBK1bqU&_nc_zt=23&_nc_ht=scontent.ftbs5-3.fna&_nc_gid=KQtheD3qZZoKxPy2R78zzw&oh=00_AfdbGwv-OEkf15lwXTSVhrpIDJd3QK8PdmeB9ia3KGBO8Q&oe=68F7D77A"
						}
						alt="Avatar Image Of User"
					/>
					<AvatarFallback />
				</Avatar>
				<div className="w-full flex flex-col">
					<Textarea onChange={(e) => setTextArea(e.target.value)} placeholder="What is on your mind..." />
					{textArea.length > 0 && (
						<div
							className="mt-2 ml-auto flex items-center gap-1 cursor-pointer bg-purple-600 rounded-sm p-1"
							onClick={() => console.log("summarize text")}
						>
							<h1 className="text-xl">AI</h1>
							<Sparkles className="w-[15px] h-[15px]" />
						</div>
					)}
				</div>
			</div>
			<div className="flex flex-col justify-between gap-3">
				<div className="flex flex-col items-center gap-5">
					{/* <input hidden onChange={handleImageFileUpload} ref={imageInputRef} type="file" multiple accept="image/*" /> */}
					<CldUploadWidget uploadPreset="social_media_preset">
						{({ open }) => {
							return <button onClick={() => open()}>Upload an Image</button>;
						}}
					</CldUploadWidget>

					{images.map((img, index) => (
						<div className="w-3/4 flex flex-col mt-2 gap-2">
							<X
								onClick={() => setImages((prev) => prev.filter((_, imgIndex) => imgIndex !== index))}
								className="border cursor-pointer rounded-full p-1 ml-auto bg-red-500"
							/>
							<img key={index} className="w-full" src={img} alt={`Uploaded Image Number ${index}`} />
						</div>
					))}
				</div>
			</div>
			{(textArea.length !== 0 || images.length !== 0) && (
				<Button onClick={handleSubmit} className="w-full cursor-pointer">
					Done
				</Button>
			)}
		</Card>
	);
}

export default CreatePost;
