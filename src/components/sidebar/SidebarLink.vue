<script setup lang="ts">
import { computed } from 'vue'
import SidebarItem from './SidebarItem.vue'
import { useRoute, type RouterLinkProps } from 'vue-router'

const props = defineProps<RouterLinkProps>()

const route = useRoute()
const active = computed(() => props.to && route.path === props.to)
</script>

<template>
  <RouterLink v-bind="props">
    <SidebarItem :active="active">
      <slot />
    </SidebarItem>
  </RouterLink>
</template>

<style scoped></style>
