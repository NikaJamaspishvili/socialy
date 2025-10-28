import { insertPostComment } from "@/actions/posts.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddComment = ({
	userId,
	postId,
	refetch,
	setPostCommentCount,
}: {
	userId: string;
	postId: string;
	refetch: () => void;
	setPostCommentCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
	async function handleFormSubmit(e: React.FormEvent) {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const formData = new FormData(e.target as HTMLFormElement);
		const content = formData.get("content") as string;
		if (content.trim().length === 0) return alert("Content Can't Be Empty");
		await insertPostComment(postId, userId, content);
		setPostCommentCount((prev) => (prev += 1));
		form.reset();
		refetch();
	}

	return (
		<form onSubmit={handleFormSubmit} className="flex gap-3">
			<Input name="content" type="text" placeholder="add your comment..." />
			<Button className="cursor-pointer">Add</Button>
		</form>
	);
};

export default AddComment;
