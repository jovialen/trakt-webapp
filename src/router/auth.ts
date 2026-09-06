// import { useAuthStore } from '@/stores/auth'
import { useAuth } from '@clerk/vue'
import type {
  NavigationGuardReturn,
  NavigationGuardWithThis,
  RouteLocationNormalized,
} from 'vue-router'

export const routerAuthGuard: NavigationGuardWithThis<undefined> = async (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
): Promise<NavigationGuardReturn> => {
  // const auth = useAuthStore()
  const auth = useAuth()

  // Wait until the auth loads
  while (auth.isLoaded.value !== true) {
    await new Promise((resolve) => setTimeout(resolve, 10))
  }

  // If we are trying to get to one of the modals for logging in
  if (to.meta.noAuth === true) {
    // If we're already logged in, go back to the page we came from, or the
    // home page if that is missing
    if (auth.isSignedIn.value === true) {
      const redirectUri = to.query.redirect?.toString() || to.redirectedFrom || '/'
      return redirectUri
    }

    // If we are logged out, then we do need to log in, so we can approve going
    // to the login modals
    return true
  }

  // If we are trying to get to anything else, then we have to be logged in to
  // access it. If we aren't logged in, redirect to the login page.
  if (auth.isSignedIn.value !== true) {
    return {
      name: 'Login',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  // If we are signed in however, then there is no problem with approving going
  // to the page.
  return true
}
