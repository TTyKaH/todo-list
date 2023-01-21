import { ref } from "vue";

export const useToggleLoader = () => {
  const isLoading = ref(false);

  const toggleLoader = (isRotate = false) => {
    isLoading.value = isRotate;
  };

  return { isLoading, toggleLoader };
};
