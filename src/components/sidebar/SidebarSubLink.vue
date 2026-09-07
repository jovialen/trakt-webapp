<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, type RouterLinkProps } from 'vue-router'
import SidebarSubItem from './SidebarSubItem.vue'

const props = defineProps<RouterLinkProps>()

const route = useRoute()
const active = computed(() => props.to && route.path === props.to)
</script>

<template>
  <RouterLink v-bind="props">
    <SidebarSubItem :active="active">
      <slot />
    </SidebarSubItem>
  </RouterLink>
</template>

<style scoped></style>
