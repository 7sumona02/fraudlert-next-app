import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Package2Icon, User } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <div className="sticky inset-x-0 top-0 z-30 w-full bg-white/75 backdrop-blur-lg transitional-all">
      <header className=" border-b px-4 md:px-6 flex items-center h-16 shrink-0">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
          <Package2Icon className="w-6 h-6" />
          <span className="sr-only">Acme Fraud Detection</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 ml-10 text-sm font-medium">
          <Link href="/transactions" className="text-muted-foreground hover:text-foreground" prefetch={false}>
            Transactions
          </Link>
          <Link href="/alerts" className="text-muted-foreground hover:text-foreground" prefetch={false}>
            Alerts
          </Link>
          <Link href="/reports" className="text-muted-foreground hover:text-foreground" prefetch={false}>
            Reports
          </Link>
          <Link href="/settings" className="text-muted-foreground hover:text-foreground" prefetch={false}>
            Settings
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>John Doe</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
};

export default Navbar;