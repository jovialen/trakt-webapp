<script setup lang="ts">
import { useRoute } from 'vue-router'
import { SignIn } from '@clerk/vue'

const { query, redirectedFrom } = useRoute()
const redirect = query.redirect?.toString() || redirectedFrom?.fullPath || '/'
</script>

<template>
  <div class="flex items-center justify-center w-screen h-screen">
    <SignIn :forceRedirectUrl="redirect" />
  </div>
</template>

<style scoped></style>
