<script setup lang="ts">
import { PhTray } from '@phosphor-icons/vue'
import { SignOutButton } from '@clerk/vue'
import { useQuery } from '@pinia/colada'
import { useApi } from '@/api'
import { computed } from 'vue'

const api = useApi()

const {
  data: response,
  isPending,
  isLoading,
  refresh,
} = useQuery({
  key: ['token'],
  query: () => api.getAuth(),
})
const token = computed(() => response.value?.data)
</script>

<template>
  <div class="flex">
    <PhTray :size="32" color="var(--heading)" weight="bold" />
    <h1 class="text-3xl font-bold">Daily Mix</h1>
  </div>
  <h2 class="metadata text-accent">Your one stop shop for all your news</h2>
  <SignOutButton class="hover:text-accent hover:cursor-pointer" />
  <p>
    Token:
    <span v-if="isPending || isLoading">Loading...</span>
    <span v-else>{{ token }}</span>
  </p>
  <button @click="refresh()">Refetch</button>
</template>

<style scoped></style>
