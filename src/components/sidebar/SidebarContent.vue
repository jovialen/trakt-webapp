<script setup lang="ts"></script>

<template>
  <div class="">
    <slot />
  </div>
</template>

<style scoped>
@reference "../../globals.css";

div > * {
  @apply py-4 border-b-2 border-border;
}

div > *:first-child {
  @apply pt-0;
}

div > *:last-child {
  @apply pb-0 border-b-0;
}
</style>
