<script setup lang="ts">
defineProps(['disabled'])
</script>

<template>
  <button
    :disabled="$props.disabled"
    class="flex items-center justify-center w-full p-2 font-mono text-sm rounded-lg hover:bg-secondary hover:text-heading transition cursor-pointer"
  >
    <slot />
  </button>
</template>

<style scoped></style>
