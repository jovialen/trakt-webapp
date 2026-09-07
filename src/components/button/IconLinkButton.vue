<script setup lang="ts">
import { type RouterLinkProps } from 'vue-router'

const props = defineProps<RouterLinkProps>()
</script>

<template>
  <RouterLink v-bind="props">
    <span
      class="flex items-center justify-center w-full p-2 font-mono text-sm rounded-lg hover:bg-secondary hover:text-heading transition"
    >
      <slot />
    </span>
  </RouterLink>
</template>

<style scoped></style>
