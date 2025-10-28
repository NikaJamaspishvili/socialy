"use client";

import { getAllPosts } from "@/actions/posts.action";
import PostImages from "./PostImages";
import Image from "next/image";
import PostActities from "./PostActivities";
import { Button } from "@/components/ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loader from "@/components/ui/Loader";

const Posts = ({ userId }: { userId: string }) => {
	const { data, isFetchingNextPage, fetchNextPage, isFetching, isLoading } = useInfiniteQuery({
		queryKey: ["fetchPosts"],
		queryFn: ({ pageParam }: { pageParam: string | undefined }) => getAllPosts(userId, pageParam),
		initialPageParam: undefined,
		getNextPageParam: (lastPage) => {
			console.log("last page", lastPage);
			if (lastPage.length === 0) return undefined;
			return lastPage[lastPage.length - 1].id;
		},
	});
	if (isLoading) return <Loader message="Fetching Posts..." />;
	console.log(data);
	if (!isFetching && data?.pages[0].length === 0)
		return (
			<div className="text-center mt-10">
				<h1 className="text-2xl font-bold">Couldn't find any posts</h1>
			</div>
		);
	if (data)
		return (
			<div className="flex flex-col items-center gap-15 mt-15">
				{data?.pages.map((page) => {
					return page.map((post) => (
						<div key={post.id} className="w-1/2 flex flex-col gap-2 items-center">
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
								<PostActities
									userId={post.user.id}
									postId={post.id}
									likeCount={post._count.PostLikes}
									commentCount={post._count.PostComments}
								/>
							</section>
						</div>
					));
				})}
				{data.pages[data.pages.length - 1].length >= 5 && (
					<Button className="cursor-pointer" onClick={() => fetchNextPage()}>
						Show More Posts
					</Button>
				)}
			</div>
		);
};

export default Posts;
