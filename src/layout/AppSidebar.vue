<script setup lang="ts">
import { PhArrowClockwise, PhCaretDown, PhPlus, PhSquare, PhTray } from '@phosphor-icons/vue'
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
} from '../components/sidebar'
import { useQuery } from '@pinia/colada'
import { useApi } from '../api'
import { computed } from 'vue'
import { IconButton, IconLinkButton, LinkButton } from '../components/button'
import { UserButton } from '@clerk/vue'

const SIDEBAR_ROUTES: { name: string; href: string }[] = [
  { name: 'front_page', href: '/' },
  { name: 'all', href: '/all' },
  { name: 'today', href: '/today' },
  { name: 'read_later', href: '/read_later' },
  { name: 'saved', href: '/saved' },
]

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

const feeds = computed<{ id: number; name: string; groups: number[] }[]>(
  () => (feedsStatus.value === 'success' && feedsResponse.value?.data) || [],
)
const ungroupedFeeds = computed(() => feeds.value.filter((feed) => feed.groups.length === 0))

const groups = computed<{ id: number; name: string }[]>(
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

const refresh = () => {
  refreshFeeds()
  refreshGroups()
}
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <PhTray :size="42" weight="fill" />
      <h1 class="text-2xl font-semibold">{{ $t('app.title') }}</h1>
    </SidebarHeader>

    <SidebarContent>
      <nav>
        <SidebarGroup>
          <SidebarGroupItem v-for="route in SIDEBAR_ROUTES">
            <SidebarLink :to="route.href">
              {{ $t(`nav.${route.name}`) }}
              <span class="text-sm metadata leading-none">1.2k</span>
            </SidebarLink>
          </SidebarGroupItem>
        </SidebarGroup>
      </nav>

      <SidebarGroup>
        <SidebarGroupHeader>
          <h2>{{ $t('feeds') }}</h2>

          <div class="flex">
            <IconButton @click="refresh">
              <PhArrowClockwise :size="16" :class="{ 'animate-spin': isLoadingFeeds }" />
            </IconButton>
            <IconLinkButton to="/feeds/new">
              <PhPlus :size="16" />
            </IconLinkButton>
          </div>
        </SidebarGroupHeader>

        <!-- Skeleton items while we wait for the feeds to load -->
        <SidebarGroupItem v-if="isLoadingFeeds" v-for="_ in 3">
          <SidebarItemSkeleton />
        </SidebarGroupItem>

        <!-- Actual feeds -->
        <template v-else>
          <template v-for="group in groupsWithFeeds">
            <SidebarGroupItem>
              <SidebarLink :to="`/groups/${group.id}`">
                <span class="flex gap-2 items-center font-semibold">
                  <PhCaretDown :size="8" weight="fill" /> {{ group.name }}
                </span>
                <span class="text-sm metadata leading-none">251</span>
              </SidebarLink>
            </SidebarGroupItem>

            <SidebarGroupItem v-if="isLoadingFeeds" v-for="_ in 3">
              <SidebarItemSkeleton />
            </SidebarGroupItem>

            <SidebarGroupItem v-else v-for="feed in group.feeds">
              <SidebarLink :to="`/feeds/${feed.id}`">
                <span class="flex gap-2 items-center">
                  <PhSquare :size="8" weight="regular" /> {{ feed.name }}
                </span>
                <span class="text-sm metadata leading-none">144</span>
              </SidebarLink>
            </SidebarGroupItem>
          </template>

          <SidebarGroupItem v-for="feed in ungroupedFeeds">
            <SidebarLink :to="`/feeds/${feed.id}`">
              <span class="flex gap-2 items-center">
                <PhSquare :size="8" weight="regular" /> {{ feed.name }}
              </span>
              <span class="text-sm metadata leading-none">144</span>
            </SidebarLink>
          </SidebarGroupItem>
        </template>

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
