<script setup lang="ts">
import { useRoute } from 'vue-router'
import { SignUp } from '@clerk/vue'

const { query, redirectedFrom } = useRoute()
const redirect = query.redirect?.toString() || redirectedFrom?.fullPath || '/'
</script>

<template>
  <div class="flex items-center justify-center h-screen w-screen">
    <SignUp :forceRedirectUrl="redirect" />
  </div>
</template>

<style scoped></style>
