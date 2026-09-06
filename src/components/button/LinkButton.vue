<script setup lang="ts">
import { type RouterLinkProps } from 'vue-router'

const { variant, ...props } = defineProps<
  RouterLinkProps & { variant: 'primary' | 'secondary' | 'ghost' }
>()
</script>

<template>
  <RouterLink v-bind="props">
    <div
      class="flex items-center justify-center w-full py-3 px-4 font-mono text-sm gap-2 border border-border rounded-lg transition"
      :class="variant"
    >
      <slot />
    </div>
  </RouterLink>
</template>

<style scoped>
@reference "../../globals.css";

.primary {
  @apply bg-primary text-primary-foreground;
}

.secondary {
  @apply bg-surface text-foreground;
}

.ghost {
  @apply bg-transparent border-dashed hover:bg-secondary hover:text-secondary-foreground hover:border-muted;
}
</style>
