import Navbar from "@/components/home/Navbar/Navbar";
import CreatePost from "@/components/home/CreatePost/CreatePost";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Posts from "@/components/home/Posts/page";

export default async function Home() {
	const session = await auth();
	if (!session?.user?.id) return redirect("/login");
	return (
		<div className="flex flex-col pt-2 pb-5 w-full gap-5">
			<Navbar />
			<CreatePost userId={session.user.id} userImage={session.user.image} />
			<Posts userId={session.user.id} />
		</div>
	);
}
