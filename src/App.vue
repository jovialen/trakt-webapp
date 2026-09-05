<script setup lang="ts"></script>

<template>
  <h1 class="text-3xl font-bold">Daily Mix</h1>
  <h2 class="metadata text-accent">Your one stop shop for all your news</h2>
  <nav>
    <RouterLink to="/">Frontpage</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
