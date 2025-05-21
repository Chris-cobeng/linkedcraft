import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { generateFallbackAvatar } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

type UserProfileFooterProps = {
  isCollapsed?: boolean;
};

type Profile = {
  full_name: string | null;
  avatar_url: string | null;
};

export function UserProfileFooter({ isCollapsed }: UserProfileFooterProps) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("full_name, avatar_url")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    }

    loadProfile();
  }, [user]);

  const fullName = profile?.full_name || user?.email?.split("@")[0] || "User";
  const avatarUrl = profile?.avatar_url || generateFallbackAvatar(fullName);

  return (
    <div
      className={cn(
        "flex items-center gap-3 border-t p-3",
        isCollapsed ? "flex-col" : "px-4"
      )}
    >
      <Avatar>
        <AvatarImage src={avatarUrl} alt={fullName} />
        <AvatarFallback>{fullName.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      {!isCollapsed && (
        <div className="flex flex-col overflow-hidden">
          <p className="truncate text-sm font-medium">{fullName}</p>
          <p className="truncate text-xs text-muted-foreground">
            {user?.email}
          </p>
        </div>
      )}
    </div>
  );
}
