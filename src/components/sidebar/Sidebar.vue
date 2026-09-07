<script setup lang="ts"></script>

<template>
  <aside
    class="bg-sidebar h-screen w-82 p-6 flex-none flex flex-col border-r border-border gap-8 fixed"
  >
    <slot />
  </aside>

  <!-- Padding -->
  <div class="min-w-82 flex-none" />
</template>

<style scoped></style>
