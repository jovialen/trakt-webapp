<script setup lang="ts">
import { useApi } from '@/api'
import type { Feed } from '@/api/types'
import { useQuery } from '@pinia/colada'
import { computed } from 'vue'

const api = useApi()

const {
  data: articleData,
  isLoading,
  status: articlesStatus,
} = useQuery({
  key: ['articles'],
  query: () => api.getArticles(),
})

const { data: feedData, status: feedsStatus } = useQuery({
  key: ['feeds'],
  query: () => api.getFeeds(),
})

const feeds = computed(() => (feedsStatus.value === 'success' && feedData.value?.data) || [])
const indexedFeeds = computed(() => {
  const indexed: { [id: number]: Feed } = {}
  for (let feed of feeds.value) {
    indexed[feed.id] = feed
  }
  return indexed
})
const articles = computed(
  () => (articlesStatus.value === 'success' && articleData.value?.data) || [],
)
</script>

<template>
  <div class="py-6 px-12 space-y-12">
    <div>
      <h1 class="font-display text-3xl text-heading font-semibold">Front page</h1>
      <h2 class="metadata text-accent">Your one stop shop for all your news</h2>
    </div>

    <p v-if="isLoading">Loading...</p>
    <ul class="grid grid-cols-4 gap-6" v-else>
      <li v-for="article in articles">
        <a :href="article.link" target="_blank">
          <article class="bg-surface p-6 border border-border rounded-lg">
            <span
              v-if="indexedFeeds[article.feed_id] !== undefined"
              class="uppercase metadata text-accent text-sm"
            >
              {{ indexedFeeds[article.feed_id].name }}
            </span>

            <h2 class="text-lg text-heading font-display font-semibold">{{ article.title }}</h2>
            <p class="font-display">{{ article.summary }}</p>
          </article>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
