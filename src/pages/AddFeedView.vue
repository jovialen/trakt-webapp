<script setup lang="ts">
import { useApi } from '@/api'
import { useQuery } from '@pinia/colada'
import { computed, ref } from 'vue'

const api = useApi()

const {
  data,
  isLoading,
  status: fetchStatus,
} = useQuery({
  key: ['groups'],
  query: () => api.getGroups(),
})

const groups = computed(() => (fetchStatus.value === 'success' && data.value?.data) || [])

const formStatus = ref<'init' | 'submitting' | 'success' | 'error'>('init')
const formData = ref({ name: '', link: '', groups: [] })

const submit = async () => {
  formStatus.value = 'submitting'
  const response = await api.createFeed(formData.value)

  if (response.status >= 200 && response.status < 300) {
    formStatus.value = 'success'
    formData.value.name = ''
    formData.value.link = ''
    formData.value.groups = []
  } else {
    formStatus.value = 'error'
  }
}
</script>

<template>
  <form @submit.prevent="submit" class="flex flex-col gap-2 max-w-screen-sm p-6">
    <h1 class="font-display font-semibold text-3xl">Add a feed</h1>

    <label for="name">Name</label>
    <input type="text" name="name" id="name" v-model="formData.name" />

    <label for="link">Link</label>
    <input type="url" name="link" id="link" v-model="formData.link" />

    <ul v-if="!isLoading">
      <li v-for="group in groups" class="flex gap-2">
        <input
          type="checkbox"
          name="groups"
          :id="group.name"
          :value="group.id"
          v-model="formData.groups"
        />
        <label :for="group.name">{{ group.name }}</label>
      </li>
    </ul>
    <p v-else>Loading groups...</p>

    <button type="submit">Create</button>
  </form>

  <RouterLink to="/groups/new" class="underline hover:text-accent transition px-6"
    >Add a new group instead</RouterLink
  >
</template>

<style scoped>
@reference "../globals.css";

input,
button {
  @apply bg-surface border border-border py-3 px-4 text-sm;
}
</style>
