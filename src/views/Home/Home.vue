<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="4" class="pa-6 text-center">

          <v-icon size="64" color="primary">
            mdi-view-dashboard
          </v-icon>

          <h1 class="text-h4 font-weight-bold mt-4">
            Bem-vindo ao Sistema
          </h1>

          <p class="text-subtitle-1 mt-2 text-medium-emphasis">
            Gerencie seus projetos, usuários e dados de forma simples e eficiente.
          </p>

          <v-divider class="my-6" />

          <v-btn
            color="primary"
            size="large"
            prepend-icon="mdi-rocket-launch"
            @click="$router.push('/dashboard')"
          >
            Acessar Dashboard
          </v-btn>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
.fill-height {
  min-height: calc(100vh - 64px);
}
</style>
