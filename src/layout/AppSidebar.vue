<script setup lang="ts">
import { PhArrowClockwise, PhCaretDown, PhPlus, PhSquare } from '@phosphor-icons/vue'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupHeader,
  SidebarGroupItem,
  SidebarHeader,
  SidebarItemSkeleton,
  SidebarLink,
  SidebarSubItemSkeleton,
} from '../components/sidebar'
import { useQuery } from '@pinia/colada'
import { useApi } from '../api'
import { computed, ref } from 'vue'
import { IconButton, IconLinkButton, LinkButton } from '../components/button'
import { UserButton } from '@clerk/vue'
import Logo from '@/components/branding/Logo.vue'
import SidebarSubLink from '@/components/sidebar/SidebarSubLink.vue'
import type { Feed, Group } from '@/api/types'

const api = useApi()

const {
  data: groupsResponse,
  isLoading: isLoadingGroups,
  status: groupsStatus,
  refresh: refreshGroups,
} = useQuery({
  key: ['groups'],
  query: () => api.getGroups(),
})

const {
  data: feedsResponse,
  isLoading: isLoadingFeeds,
  status: feedsStatus,
  refresh: refreshFeeds,
} = useQuery({
  key: ['feeds'],
  query: () => api.getFeeds(),
})

const feeds = computed<Feed[]>(
  () => (feedsStatus.value === 'success' && feedsResponse.value?.data) || [],
)
const ungroupedFeeds = computed(() => feeds.value.filter((feed) => feed.groups.length === 0))

const groups = computed<Group[]>(
  () => (groupsStatus.value === 'success' && groupsResponse.value?.data) || [],
)
const groupsWithFeeds = computed(() =>
  groups.value.map((group) => {
    return {
      ...group,
      feeds: feeds.value.filter((feed) => feed.groups.includes(group.id)),
    }
  }),
)

const isRefreshing = ref(false)

const refresh = async () => {
  isRefreshing.value = true

  await api.syncFeeds()

  await refreshFeeds()
  await refreshGroups()

  isRefreshing.value = false
}

const SIDEBAR_ROUTES = computed<{ name: string; href: string; count?: number }[]>(() => [
  { name: 'front_page', href: '/' },
  { name: 'all', href: '/all', count: feeds.value.reduce((sum, feed) => sum + feed.unread, 0) },
  {
    name: 'today',
    href: '/today',
    count: Math.floor(feeds.value.reduce((sum, feed) => sum + feed.unread, 0) / 10),
  },
  { name: 'read_later', href: '/read_later', count: 7 },
  { name: 'saved', href: '/saved', count: 15 },
])
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <Logo />
      <h1 class="text-2xl font-semibold">{{ $t('app.title') }}</h1>
    </SidebarHeader>

    <SidebarContent>
      <nav>
        <SidebarGroup>
          <SidebarGroupItem v-for="route in SIDEBAR_ROUTES">
            <SidebarLink :to="route.href">
              {{ $t(`nav.${route.name}`) }}
              <span class="text-sm metadata leading-none" v-if="route.count">{{
                route.count
              }}</span>
            </SidebarLink>
          </SidebarGroupItem>
        </SidebarGroup>
      </nav>

      <SidebarGroup>
        <SidebarGroupHeader>
          <h2>{{ $t('feeds') }}</h2>

          <div class="flex">
            <IconButton @click="refresh" :disabled="isRefreshing">
              <PhArrowClockwise
                :size="16"
                :class="{ 'animate-spin': isRefreshing || isLoadingFeeds || isLoadingGroups }"
              />
            </IconButton>
            <IconLinkButton to="/feeds/new">
              <PhPlus :size="16" />
            </IconLinkButton>
          </div>
        </SidebarGroupHeader>

        <!-- Skeleton items while we wait for the feeds to load -->
        <SidebarGroupItem v-if="isLoadingFeeds && isLoadingGroups" v-for="_ in 3">
          <SidebarItemSkeleton />
        </SidebarGroupItem>

        <!-- Actual feeds -->
        <template v-if="!isLoadingGroups" v-for="group in groupsWithFeeds">
          <SidebarGroupItem>
            <SidebarLink :to="`/groups/${group.id}`" class="text-heading">
              <span class="flex gap-2 items-center font-semibold">
                <PhCaretDown :size="8" weight="fill" /> {{ group.name }}
              </span>
              <span class="text-sm metadata leading-none">{{
                group.feeds.reduce((sum, feed) => sum + feed.unread, 0)
              }}</span>
            </SidebarLink>
          </SidebarGroupItem>

          <SidebarGroupItem v-if="isLoadingFeeds" v-for="_ in 3">
            <SidebarSubItemSkeleton />
          </SidebarGroupItem>

          <SidebarGroupItem v-else v-for="feed in group.feeds">
            <SidebarSubLink :to="`/feeds/${feed.id}`">
              <span class="flex gap-2 items-center">
                <PhSquare :size="8" weight="regular" /> {{ feed.name }}
              </span>
              <span class="text-sm metadata leading-none">{{ feed.unread }}</span>
            </SidebarSubLink>
          </SidebarGroupItem>
        </template>

        <SidebarGroupItem v-if="!isLoadingFeeds" v-for="feed in ungroupedFeeds">
          <SidebarLink :to="`/feeds/${feed.id}`" class="text-heading">
            <span class="flex gap-2 items-center">
              <PhSquare :size="8" weight="regular" /> {{ feed.name }}
            </span>
            <span class="text-sm metadata leading-none">{{ feed.unread }}</span>
          </SidebarLink>
        </SidebarGroupItem>

        <SidebarGroupItem>
          <LinkButton variant="ghost" to="/feeds/new">
            <PhPlus :size="12" /> Add feed / OPML
          </LinkButton>
        </SidebarGroupItem>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <div class="flex w-full justify-center">
        <UserButton :showName="true" />
      </div>
    </SidebarFooter>
  </Sidebar>
</template>
