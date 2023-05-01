<template>
  <div class="loader">
    <VueFeather
      type="refresh-ccw"
      class="loader__icon"
      stroke="white"
      id="loader__icon"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import type { Loader } from "@/types/ui/loader";

// loader settings
const loader: Loader = {
  element: null,
  frameRate: 60, // f/s
  rotationalSpeed: 0.8, // r/s
  angleBuffer: 0,
  timerID: null,
};

const rotateLoader = () => {
  if (loader.element !== null) {
    loader.element.style.transform = "rotate(0deg)";

    const timeToRerender = Math.floor((1 / loader.frameRate) * 1000);
    const angleIncrement = (360 * loader.rotationalSpeed) / loader.frameRate;

    loader.timerID = setInterval(() => {
      if (loader.element !== null) {
        loader.angleBuffer = loader.angleBuffer + angleIncrement;
        loader.element.style.transform = `rotate(${-loader.angleBuffer}deg)`;
      }
    }, timeToRerender);
  }
};

onMounted(() => {
  loader.element = document.getElementById("loader__icon");
  rotateLoader();
});
</script>

<style lang="scss" scoped>
.loader {
  @apply fixed inset-0 flex justify-center items-center z-40;
  background-color: var(--bg-modal);

  &__icon {
    transform: rotate(20deg);
  }
}
</style>
