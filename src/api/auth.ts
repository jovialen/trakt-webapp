import type { GetToken } from '@clerk/vue/types'
import type { Axios, InternalAxiosRequestConfig } from 'axios'
import type { ShallowRef } from 'vue'

export const requestAuthTokenInjector =
  (getToken: ShallowRef<GetToken>) =>
  async (
    request: InternalAxiosRequestConfig<any, any>,
  ): Promise<InternalAxiosRequestConfig<any, any>> => {
    const token = await getToken.value()

    request.headers.Authorization = `Bearer ${token}`

    return request
  }
