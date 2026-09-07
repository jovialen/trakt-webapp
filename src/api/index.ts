import axios from 'axios'
import { requestAuthTokenInjector } from './auth'
import { defineStore } from 'pinia'
import { useAuth } from '@clerk/vue'
import type { Article, Feed, Group } from './types'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const useApi = defineStore('api', () => {
  const { getToken } = useAuth()

  const api = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  api.interceptors.request.use(requestAuthTokenInjector(getToken))

  const getAuth = () => api.get('/auth')

  const syncFeeds = () => api.post('/feeds/sync')

  const getNewFeed = () => api.get<Feed>('/feeds/new')
  const getFeeds = () => api.get<Feed[]>('/feeds')
  const createFeed = (data: { name: string; link: string; groups: number[] }) =>
    api.post<Feed>('/feeds', data)

  const getNewGroup = () => api.get<Group>('/groups/new')
  const getGroups = () => api.get<Group[]>('/groups')
  const createGroup = (data: { name: string }) => api.post<Group>('/groups', data)

  const getFeedsByGroup = (group: number) => api.get<Feed[]>(`/groups/${group}/feeds`)

  const getArticles = () => api.get<Article[]>('/items')
  const getArticlesByFeed = (feed: number) => api.get<Article[]>(`/feeds/${feed}/items`)
  const getArticlesByGroup = (group: number) => api.get<Article[]>(`/groups/${group}/items`)

  return {
    getAuth,

    syncFeeds,

    getNewFeed,
    getFeeds,
    createFeed,

    getNewGroup,
    getGroups,
    createGroup,

    getFeedsByGroup,

    getArticles,
    getArticlesByFeed,
    getArticlesByGroup,
  }
})
