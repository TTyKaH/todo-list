import type { User } from "@/types/user";
import { useWindowChecker } from "@/composable/useWindowChecker";

export const getUserFromLocalStore = (): User | null => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};


export const getInitialPerPage = () => {
  const { isLargeDesktop } = useWindowChecker();
  return isLargeDesktop.value ? 12 : 6;
};
