<template>
  <v-app>
    <!-- Top Bar -->
     <NavBar @toggle-drawer="toggleDrawer" />
    <!-- Top Bar -->
    <!-- SideBar -->
    <SideBar :drawer="drawer" />
    <!--SideBar-->


    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pa-6">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from '@/components/layout/NavBar.vue'
import SideBar from '@/components/layout/SideBar.vue'

const drawer = ref(true)

function toggleDrawer () {
  drawer.value = !drawer.value
}
</script>
