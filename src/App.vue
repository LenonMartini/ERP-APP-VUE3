<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
import { watch } from 'vue'
import { useTheme } from 'vuetify'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const theme = useTheme()

// 🔁 sincroniza o tema com as preferências do usuário
watch(
  () => authStore.preferences,
  (preferences) => {
    if (preferences?.length) {
      const themePref = preferences.find(p => p.key === 'theme')

      theme.global.name.value = themePref?.value === 'dark'
        ? 'dark'
        : 'light'
    }
  },
  { immediate: true }
)
</script>
