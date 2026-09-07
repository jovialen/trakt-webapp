<script setup lang="ts">
import { useApi } from '@/api'
import { ref } from 'vue'

const api = useApi()

const formStatus = ref<'init' | 'submitting' | 'success' | 'error'>('init')
const formData = ref({ name: '' })

const submit = async () => {
  formStatus.value = 'submitting'
  const response = await api.createGroup(formData.value)

  if (response.status >= 200 && response.status < 300) {
    formStatus.value = 'success'
    formData.value.name = ''
  } else {
    formStatus.value = 'error'
  }
}
</script>

<template>
  <form @submit.prevent="submit" class="flex flex-col gap-2 max-w-screen-sm p-6">
    <h1 class="font-display font-semibold text-3xl">Add a group</h1>

    <label for="name">Name</label>
    <input type="text" name="name" id="name" v-model="formData.name" />

    <button type="submit">Create</button>
  </form>

  <RouterLink to="/feeds/new" class="underline hover:text-accent transition px-6"
    >Add a new feed instead</RouterLink
  >
</template>

<style scoped>
@reference "../globals.css";

input,
button {
  @apply bg-surface border border-border py-3 px-4 text-sm;
}
</style>
