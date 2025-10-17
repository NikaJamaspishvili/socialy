import Navbar from "@/components/home/Navbar/Navbar";
import CreatePost from "@/components/home/CreatePost/CreatePost";

export default function Home() {
	return (
		<div className="flex flex-col pt-2 w-full">
			<Navbar />
			<CreatePost />
		</div>
	);
}
