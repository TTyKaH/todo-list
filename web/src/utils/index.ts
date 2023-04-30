import type { User } from "@/types/user";

export const getUserFromLocalStore = (): User | null => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};
