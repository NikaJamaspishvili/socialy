import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostComments } from "@/actions/posts.action";
import AddComment from "./AddComment";
import Image from "next/image";
import { format } from "date-fns";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const PostComments = ({
	postId,
	userId,
	setPostCommentCount,
}: {
	postId: string;
	userId: string;
	setPostCommentCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const {
		data,
		isFetchingNextPage: isLoading,
		fetchNextPage,
		refetch,
	} = useInfiniteQuery({
		queryKey: ["fetchComments" + postId],
		queryFn: ({ pageParam }: { pageParam: string | undefined }) => getPostComments(postId, pageParam),
		initialPageParam: undefined,
		getNextPageParam: (lastPage) => {
			console.log("last page", lastPage);
			if (lastPage.length === 0) {
				return undefined;
			} else {
				return lastPage[lastPage.length - 1].id;
			}
		},
	});
	console.log(data);
	if (isLoading) return <Loader className="animate-spin mx-auto w-[35px] h-[35px]" />;
	if (data)
		return (
			<div className="flex flex-col gap-3 mt-5">
				<AddComment userId={userId} postId={postId} refetch={refetch} setPostCommentCount={setPostCommentCount} />
				{data.pages.length > 0 ? (
					<section className="flex flex-col gap-3">
						{data.pages.map((page) => {
							return page.map((comment, index) => (
								<div key={index} className="flex flex-col gap-2">
									<section className="flex items-center justify-between gap-3">
										<div className="flex items-center gap-3">
											<Image
												width={400}
												height={400}
												src={comment.user.image || "/guest_image.png"}
												alt={comment.user.name + " profile image"}
												className="w-12 rounded-full"
											/>
											<h1 className="font-bold text-md">{comment.user.name}</h1>
										</div>
										<p className="text-sm">{format(new Date(comment.createdAt), "MMMM dd, yyyy")}</p>
									</section>
									<p>{comment.content}</p>
								</div>
							));
						})}
						{data.pages[data.pages.length - 1].length >= 5 && (
							<Button onClick={() => fetchNextPage()}>Show More</Button>
						)}
					</section>
				) : (
					<section>
						<h1 className="text-xl font-bold text-center">No Comments Found</h1>
					</section>
				)}
			</div>
		);
};

export default PostComments;
