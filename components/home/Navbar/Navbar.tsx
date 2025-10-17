import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/ui/ModeToggle";
import Logout from "./LogoutBtn";
import Notifications from "./NotificationBtn";

const Navbar = () => {
	return (
		<div className="flex w-full justify-between">
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Account</NavigationMenuTrigger>
						<NavigationMenuContent>
							<NavigationMenuLink href="/profile">Profile</NavigationMenuLink>
							<NavigationMenuLink asChild>
								<Logout />
							</NavigationMenuLink>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink href="/">Home</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink href="/messenger">Messenger</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
			<div className="flex items-center justify-center gap-3">
				<Notifications />
				<ModeToggle />
			</div>
		</div>
	);
};

export default Navbar;
