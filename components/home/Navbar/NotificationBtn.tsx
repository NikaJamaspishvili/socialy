import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function Notifications() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="p-2 hidden md:block rounded-full">
					<Bell />
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-80 dark:bg-black p-2 md:block hidden">
				<Card className="bg-white dark:bg-black p-4">
					<Label className="font-semibold text-2xl">Notifications</Label>
					<Card className="mt-2 flex flex-col gap-2 border-0 rounded-none dark:bg-black">
						<DropdownMenuItem>New message from John</DropdownMenuItem>
						<DropdownMenuItem>Order #123 shipped</DropdownMenuItem>
						<DropdownMenuItem>Server restarted</DropdownMenuItem>
					</Card>
				</Card>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
