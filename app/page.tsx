import Navbar from "@/components/home/Navbar/Navbar";
import CreatePost from "@/components/home/CreatePost/CreatePost";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Posts from "@/components/home/Posts/page";

export default async function Home() {
	const session = await auth();
	if (!session?.user?.id) return redirect("/login");
	return (
		<div className="flex flex-col pt-2 w-full gap-5">
			<Navbar />
			<CreatePost userId={session.user.id} />
			<Posts userId={session.user.id} />
		</div>
	);
}
