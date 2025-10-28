import { getAllPosts } from "@/actions/posts.action";
import PostImages from "./PostImages";
import Image from "next/image";
import PostActities from "./PostActivities";

const Posts = async ({ userId }: { userId: string }) => {
	const posts = await getAllPosts(userId);
	console.log(posts);
	return (
		<div className="flex flex-col items-center gap-15 mt-15">
			{posts.map((post, index) => (
				<div key={index} className="w-1/2 flex flex-col gap-2 items-center">
					<section className="flex items-center mr-auto gap-3">
						<Image
							width={400}
							height={400}
							src={post.user.image || "/guest_image.png"}
							className="bg-white rounded-full w-15"
							alt={post.user.name + " profile image"}
						/>
						<h1 className="font-bold text-xl">{post.user.name}</h1>
					</section>
					<section className="bg-gray-800 w-full p-3 rounded-xl flex flex-col gap-3">
						<p className="font-bold">{post.description}</p>
						<PostImages images={post.images} />
						<PostActities userId={post.user.id} postId={post.id} likeCount={post._count.PostLikes} />
					</section>
				</div>
			))}
		</div>
	);
};

export default Posts;
