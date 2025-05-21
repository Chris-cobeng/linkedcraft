import { cn } from "@/lib/utils";
import { LucideIcon, Settings, Layout, Calendar, FileText, User, Plus } from "lucide-react";
import { NavLink } from "react-router-dom";
import { UserProfileFooter } from "./UserProfileFooter";

type SidebarProps = {
  className?: string;
  isCollapsed?: boolean;
};

type SidebarItem = {
  title: string;
  icon: LucideIcon;
  href: string;
  isActive?: (path: string) => boolean;
};

const items: SidebarItem[] = [
  {
    title: "Dashboard",
    icon: Layout,
    href: "/",
    isActive: (path) => path === "/",
  },
  {
    title: "Posts",
    icon: FileText,
    href: "/posts",
  },
  {
    title: "Calendar",
    icon: Calendar,
    href: "/calendar",
  },
  {
    title: "Generate Post",
    icon: Plus,
    href: "/generate",
  },
  {
    title: "Profile",
    icon: User,
    href: "/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export function Sidebar({ className, isCollapsed }: SidebarProps) {
  return (
    <div
      className={cn(
        "flex flex-col h-screen border-r bg-background",
        isCollapsed ? "w-[70px]" : "w-[240px]",
        className
      )}
    >
      <div className="flex-1 overflow-auto py-8">
        <nav className="grid gap-2 px-2">
          {items.map((item, index) => (
            <NavLink
              key={index}
              to={item.href}
              end={item.isActive ? true : undefined}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                  isActive
                    ? "bg-muted text-foreground font-medium"
                    : "hover:bg-muted/50",
                  isCollapsed && "justify-center"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span>{item.title}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
      <UserProfileFooter isCollapsed={isCollapsed} />
    </div>
  );
}
