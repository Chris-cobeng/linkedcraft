import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function generateFallbackAvatar(name?: string | null) {
  if (!name) {
    return `https://ui-avatars.com/api/?name=User&background=1E3A8A&color=fff&size=256`;
  }
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1E3A8A&color=fff&size=256`;
}