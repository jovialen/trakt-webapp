<script setup lang="ts">
defineProps(['active'])
</script>

<template>
  <div
    class="flex items-center justify-between ml-4 py-3 px-4 leading-none rounded-lg hover:bg-secondary hover:text-heading transition text-sm"
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
