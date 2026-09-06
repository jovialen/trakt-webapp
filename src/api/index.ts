import axios from 'axios'
import { requestAuthTokenInjector } from './auth'
import { defineStore } from 'pinia'
import { useAuth } from '@clerk/vue'

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

  return {
    getAuth,
  }
})
