<script setup lang="ts">
import { PhTray } from '@phosphor-icons/vue'
</script>

<template>
  <div class="flex">
    <PhTray :size="32" color="var(--heading)" weight="bold" />
    <h1 class="text-3xl font-bold">Daily Mix</h1>
  </div>
  <h2 class="metadata text-accent">Your one stop shop for all your news</h2>
  <nav>
    <RouterLink to="/">Frontpage</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
