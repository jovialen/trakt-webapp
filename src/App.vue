<script setup lang="ts">
import { Show } from '@clerk/vue'
import AppSidebar from './layout/AppSidebar.vue'
</script>

<template>
  <div class="flex">
    <Show when="signed-in">
      <AppSidebar />
    </Show>

    <main class="grow bg-background">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
