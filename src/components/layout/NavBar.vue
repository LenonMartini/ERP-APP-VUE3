<template>
    <!-- Top Bar -->
    <v-app-bar
      color="primary"
      density="comfortable"
      elevation="2"
    >
      <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />

      <v-toolbar-title class="font-weight-bold">
        ERP Panel
      </v-toolbar-title>


      <v-spacer />
      <v-btn icon @click="toggleTheme">
        <v-icon>
          {{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
        </v-icon>
      </v-btn>

      <v-btn icon @click="logout">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>
</template>
<script setup>
  import { computed } from 'vue'
  import { useAuthStore } from '@/stores/auth';
  import { useLoadingStore } from '@/stores/loading';
  import { useRouter } from 'vue-router';
  import { useTheme } from 'vuetify'

  const router = useRouter();

  defineEmits(['toggle-drawer'])

  const loadingStore = useLoadingStore();
  const authStore = useAuthStore();
  // 🌗 Vuetify Theme
const theme = useTheme()
const isDark = computed(() => authStore.preferences.find(p => p.key === 'theme')?.value === 'dark')

const toggleTheme = () => {
    const newTheme = isDark.value ? 'light' : 'dark'

    // 1️⃣ Atualiza o STATE
    authStore.setThemePreference('theme', newTheme)

    // 2️⃣ Sincroniza com Vuetify
    theme.global.name.value = newTheme
}

  const logout = async () => {
    try {
      loadingStore.isLoading = true
      await authStore.logout()
      // 1️⃣ Limpa estado primeiro
      authStore.clearAuth()

      // 🔥 redirect SEM depender da API
      router.push({ name: 'login' })

    } catch (e) {
      console.error(e)
    } finally {
      loadingStore.isLoading = false
    }
  }

</script>
