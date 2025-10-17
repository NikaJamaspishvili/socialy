import { getAllPosts } from "@/actions/posts.action";
import { CldImage } from "next-cloudinary";

const Posts = async ({ userId }: { userId: string }) => {
	const posts = await getAllPosts(userId);
	return (
		<div>
			{posts.map((post) => (
				<div>
					<h1>{post.description}</h1>

					<div>
						{post.images.map((imagePublicId) => (
							<CldImage
								width="400"
								height="300"
								src={imagePublicId}
								alt="User image"
								crop="fill"
								className="rounded-xl"
							/>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default Posts;
