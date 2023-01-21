import { storeToRefs } from "pinia";
import { useLoaderStore } from "@/stores/loader";

export const useToggleLoader = () => {
  const store = useLoaderStore();

  const { isLoading } = storeToRefs(store);
  const { toggleLoader } = store;

  return { isLoading, toggleLoader };
};
