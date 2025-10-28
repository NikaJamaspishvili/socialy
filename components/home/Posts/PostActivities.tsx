"use client";
import PostComments from "./PostComments";
import { useState } from "react";
import { ThumbsUp, MessageCircle, Share } from "lucide-react";
import { likePost, unlikePost } from "@/actions/posts.action";

const PostActities = ({ userId, postId, likeCount }: { userId: string; postId: string; likeCount: number }) => {
	const [showComments, setShowComments] = useState(false);
	const [isPostLiked, setIsPostLiked] = useState(false);
	const [postLikeCount, setPostLikeCount] = useState(likeCount);

	async function handleLikeClick() {
		if (!isPostLiked) {
			setPostLikeCount((prev) => (prev += 1));
			likePost(userId, postId);
		} else {
			setPostLikeCount((prev) => (prev -= 1));
			unlikePost(userId, postId);
		}
		setIsPostLiked(!isPostLiked);
	}

	return (
		<div>
			<section className="flex items-start justify-between w-1/5 gap-3 mt-2 [&>button]:cursor-pointer">
				<button onClick={handleLikeClick} className="flex flex-col gap-1">
					<ThumbsUp fill={isPostLiked ? "white" : "none"} />
					<p>{postLikeCount}</p>
				</button>
				<button onClick={() => setShowComments(!showComments)}>
					<MessageCircle />
				</button>
				<button>
					<Share />
				</button>
			</section>
			{showComments && <PostComments postId={postId} />}
		</div>
	);
};

export default PostActities;
