<script setup lang="ts">
import { PhTray } from '@phosphor-icons/vue'
</script>

<template>
  <div class="relative">
    <PhTray :size="42" weight="fill" />
    <span
      class="absolute top-1/2 left-1/2 -translate-1/2 text-primary-foreground font-semibold text-lg cursor-default"
      >T</span
    >
  </div>
</template>

<style scoped></style>
