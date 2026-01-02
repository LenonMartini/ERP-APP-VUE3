<template>
  <v-snackbar
    v-model="store.show"
    location="top right"
    variant="outlined"
    :color="store.color"
    timeout="5000"
  >
    {{ store.message }}
  </v-snackbar>
</template>

<script setup>
import { useNotificationStore } from '@/stores/notification'
const store = useNotificationStore()
</script>
<style scoped>

</style>
