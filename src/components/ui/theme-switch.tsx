"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

export function ThemeSwitch({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <div className={cn("flex items-center gap-2 text-xs", className)}>
      <Sun
        className={cn(
          "h-4 w-4",
          isDark ? "text-muted-foreground" : "text-foreground"
        )}
        aria-hidden="true"
      />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Toggle color theme"
      />
      <Moon
        className={cn(
          "h-4 w-4",
          isDark ? "text-foreground" : "text-muted-foreground"
        )}
        aria-hidden="true"
      />
      <span className="text-muted-foreground" aria-hidden="true">
        {isDark ? "Dark" : "Light"}
      </span>
    </div>
  );
}
