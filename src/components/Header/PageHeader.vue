<template>
  <v-sheet
    class="page-header-admin"
    elevation="0"
  >
    <v-container fluid>
      <v-row align="center" no-gutters>
        <!-- Título -->
        <v-col>
          <h1 class="page-title">
            {{ title }}
          </h1>
        </v-col>

        <!-- Breadcrumb -->
        <v-col cols="auto">
          <nav class="breadcrumb">
            <span
              v-for="(item, index) in breadcrumbs"
              :key="index"
              class="breadcrumb-item"
            >
              <RouterLink
                v-if="item.to && index !== breadcrumbs.length - 1"
                :to="item.to"
              >
                {{ item.label }}
              </RouterLink>

              <span v-else>
                {{ item.label }}
              </span>

              <span
                v-if="index < breadcrumbs.length - 1"
                class="separator"
              >
                /
              </span>
            </span>
          </nav>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  breadcrumbs: {
    type: Array,
    default: () => [],
    // [{ label: 'Home', to: '/' }, { label: 'Dashboard' }]
  },
})
</script>

<style scoped>
.page-header-admin {
  background-color: transparent; /* AdminLTE */
  border-bottom: 1px solid #dee2e6;
}

.page-title {
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0;
}

.breadcrumb {
  font-size: 0.875rem;
  color: #6c757d;
}

.breadcrumb a {
  color: #0d6efd;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.separator {
  margin: 0 6px;
  color: #adb5bd;
}
</style>
