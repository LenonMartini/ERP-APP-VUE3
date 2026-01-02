<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-6">
        <progress-circular />
        <snack-bar />
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>
import { useLoadingStore } from '@/stores/loading';
import ProgressCircular from '@/components/Loading/ProgressCircular.vue';
import SnackBar from '@/components/Message/SnackBar.vue';

const loadingStore = useLoadingStore();

</script>
