import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "@/lib/auth-utils";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
  onToggleSidebar?: () => void;
};

export function Navbar({ onToggleSidebar }: NavbarProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-2 md:space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <span className="font-bold text-lg text-primary">LinkedCraft</span>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          {user && (
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
