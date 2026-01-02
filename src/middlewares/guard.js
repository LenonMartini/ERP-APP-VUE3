import { useAuthStore } from '@/stores/auth'
import Cookie from '@/utils/cookie'

export const auth = async (to, from, next) => {
  const authStore = useAuthStore()
  const token = Cookie.getToken()

  if (!token) {
    authStore.clearAuth()
    return next({ name: 'login' })
  }

  try {
    const authorized = await authStore.isLogged()

    if (!authorized) {
      return next({ name: 'login' })
    }
    return next()

  } catch (error) {
    authStore.clearAuth()
    return next({ name: 'login' })
  }
}


export const redirectIfAuthenticated = async (to, from, next) => {
  const authStore = useAuthStore()
  const token = Cookie.getToken()

  if (!token) {
    return next()
  }

  try {
    const authorized = await authStore.isLogged()

    if (authorized) {
      return next({ name: 'home' })
    }

    return next()
  } catch {
    return next()
  }
}
