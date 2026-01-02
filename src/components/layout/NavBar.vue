<template>
    <!-- Top Bar -->
    <v-app-bar
      color="primary"
      density="comfortable"
      elevation="2"
    >
      <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />

      <v-toolbar-title class="font-weight-bold">
        Admin Panel
      </v-toolbar-title>

      <v-spacer />

      <v-btn icon @click="logout">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>
</template>
<script setup>
  import { useAuthStore } from '@/stores/auth';
  import { useLoadingStore } from '@/stores/loading';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  defineEmits(['toggle-drawer'])

  const loadingStore = useLoadingStore();
  const authStore = useAuthStore();

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
