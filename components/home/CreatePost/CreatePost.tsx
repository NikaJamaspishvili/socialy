"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useRef, useState } from "react";
import { Sparkles, X } from "lucide-react";
import { uploadNewPost } from "@/actions/cloudinary.action";
import { reduceImageSize } from "@/lib/utils";
import { useTransition } from "react";
import Image from "next/image";
import Loader from "@/components/ui/Loader";
import { useQueryClient } from "@tanstack/react-query";

function CreatePost({ userId, userImage }: { userId: string; userImage: string | null | undefined }) {
	const imageInputRef = useRef<HTMLInputElement | null>(null);
	const [textArea, setTextArea] = useState("");
	const [imageUrls, setImageUrls] = useState<string[]>([]);
	const [imageFiles, setImageFiles] = useState<File[]>([]);
	const [isPending, startTransition] = useTransition();
	const queryClient = useQueryClient();

	const assembleImageView = async (imageFile: File) => {
		const allowedExtestions = ["image/png", "image/jpeg", "image/jpg"];
		const isFileValidImage = allowedExtestions.some((ext) => ext === imageFile.type);

		if (isFileValidImage) {
			setImageUrls((prev) => {
				const array = [...prev];
				array.push(URL.createObjectURL(imageFile));
				return array;
			});

			const reducedImageFile = await reduceImageSize(imageFile);

			setImageFiles((prev) => {
				const array = [...prev];
				array.push(reducedImageFile);
				return array;
			});
		}
	};

	const handleImageFileRemove = async (index: number) => {
		setImageUrls((prev) => prev.filter((_, imgIndex) => imgIndex !== index));
		setImageFiles((prev) => prev.filter((_, imgIndex) => imgIndex !== index));
	};

	const handleImageFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const imageFiles = Array.from(e.target.files);
		if (imageFiles.length > 3) {
			alert("Only 3 Images Max!");
			return;
		}
		await Promise.all(imageFiles.map(assembleImageView));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		startTransition(async () => {
			const response = await uploadNewPost(imageFiles, userId, textArea);
			queryClient.invalidateQueries({ queryKey: ["fetchPosts"] });
			if (response.status) {
				setImageFiles([]);
				setImageUrls([]);
				setTextArea("");
			}
		});
	};
	if (isPending) return <Loader message="Uploading Posts..." />;
	return (
		<form onSubmit={handleSubmit} className="mx-auto w-1/2">
			<Card className="border p-3">
				<div className="flex gap-3 items-center">
					<Image
						width={400}
						height={400}
						src={userImage || "/guest_image.png"}
						className="mb-auto w-[70px] h-full rounded-full"
						alt={"profile image"}
					/>
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
						<input hidden onChange={handleImageFileUpload} ref={imageInputRef} type="file" multiple accept="image/*" />
						<Button
							type="button"
							onClick={() => imageInputRef.current?.click()}
							variant={"secondary"}
							className="ml-auto"
						>
							Upload Image
						</Button>
						{imageUrls.map((img, index) => (
							<div key={index} className="w-3/4 flex flex-col mt-2 gap-2">
								<X
									onClick={() => handleImageFileRemove(index)}
									className="border cursor-pointer rounded-full p-1 ml-auto bg-red-500"
								/>
								<Image width={400} height={400} className="w-full" src={img} alt={`Uploaded Image Number ${index}`} />
							</div>
						))}
					</div>
				</div>
				{(textArea.length !== 0 || imageUrls.length !== 0) && (
					<Button onClick={handleSubmit} className="w-full cursor-pointer">
						Done
					</Button>
				)}
			</Card>
		</form>
	);
}

export default CreatePost;
