<script setup lang="ts">
defineProps(['active'])
</script>

<template>
  <div
    class="flex items-center justify-between w-full py-3 px-4 leading-none rounded-lg hover:bg-secondary hover:text-heading transition"
    :class="{ active: active }"
  >
    <slot />
  </div>
</template>

<style scoped>
@reference "../../globals.css";

.active {
  @apply bg-secondary text-heading;
}
</style>
