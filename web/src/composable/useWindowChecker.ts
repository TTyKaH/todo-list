import { ref, computed, onMounted, onUnmounted } from "vue";

export const useWindowChecker = () => {
  let windowWidth = ref(0);

  const getWindowWidth = () => {
    // return window.innerWidth;
    windowWidth.value = window.innerWidth;
  };

  window.addEventListener("resize", getWindowWidth);

  /**
   * breakpoints were taken from tailwind
   *          mobile < 768px
   * 768px <= tablet < 1024px
   * 1024px <= desktop < 1536px
   * 1536px <= desktop l
   */
  const breakpoints = {
    mobileMax: 768,
    tabletMin: 768,
    tabletMax: 1024,
    desktopMin: 1024,
    desktopMax: 1536,
    desktopLargeMin: 1536,
  };

  const isMobile = computed(() => windowWidth.value < breakpoints.mobileMax);

  const isTablet = computed(
    () =>
      windowWidth.value >= breakpoints.tabletMin &&
      windowWidth.value < breakpoints.tabletMax
  );

  const isDesktop = computed(
    () =>
      windowWidth.value >= breakpoints.desktopMin &&
      windowWidth.value < breakpoints.desktopMax
  );

  const isLargeDesktop = computed(
    () => windowWidth.value >= breakpoints.desktopLargeMin
  );

  onMounted(() => getWindowWidth());
  onUnmounted(() => window.removeEventListener("resize", getWindowWidth));

  return {
    windowWidth,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
  };
};
