<template>
  <v-navigation-drawer
    v-model="localDrawer"
    app
    width="260"
  >
    <v-list nav density="comfortable">

      <!-- Dashboard -->
      <v-list-item
        title="Dashboard"
        prepend-icon="mdi-view-dashboard"
        to="/dashboard"
        router
      />
       <!-- Cadastros com Submenu -->
      <v-list-group
        value="registrations"
        prepend-icon="mdi-database"
      >
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            title="Cadastros"
          />
        </template>

        <!-- Status -->
        <v-list-item
          title="Status"
          prepend-icon="mdi-flag"
          to="/cadastros/status"
          router
        />

        <!-- Categorias -->
        <v-list-item
          title="Categorias"
          prepend-icon="mdi-shape"
          to="/cadastros/categorias"
          router
        />

        <!-- Clientes -->
        <v-list-item
          title="Clientes"
          prepend-icon="mdi-account-group"
          to="/cadastros/clientes"
          router
        />

        <!-- Fornecedores -->
        <v-list-item
          title="Fornecedores"
          prepend-icon="mdi-truck"
          to="/cadastros/fornecedores"
          router
        />

        <!-- Produtos -->
        <v-list-item
          title="Produtos"
          prepend-icon="mdi-package-variant-closed"
          to="/cadastros/produtos"
          router
        />

        <!-- Unidades / Filiais -->
        <v-list-item
          title="Unidades"
          prepend-icon="mdi-office-building"
          to="/cadastros/unidades"
          router
        />

        <!-- Formas de Pagamento -->
        <v-list-item
          title="Formas de Pagamento"
          prepend-icon="mdi-credit-card"
          to="/cadastros/formas-pagamento"
          router
        />

        <!-- Condições de Pagamento -->
        <v-list-item
          title="Condições de Pagamento"
          prepend-icon="mdi-calendar-clock"
          to="/cadastros/condicoes-pagamento"
          router
        />

      </v-list-group>


      <!-- Configurações com Submenu -->
      <v-list-group
        value="settings"
        prepend-icon="mdi-cog"
      >
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            title="Configurações"
          />
        </template>

        <v-list-item
          title="Tenants"
          prepend-icon="mdi-account-group"
          to="/settings/profile"
          router
        />
        <v-list-item
          title="Usuarios"
          prepend-icon="mdi-account-multiple"
          to="/settings/profile"
          router
        />       

        <v-list-item
          title="Permissões"
          prepend-icon="mdi-shield-account"
          to="/settings/permissions"
          router
        />

        <v-list-item
          title="Sistema"
          prepend-icon="mdi-cogs"
          to="/settings/system"
          router
        />
      </v-list-group>

    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  drawer: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['update:drawer']);

const localDrawer = computed({
  get: () => props.drawer,
  set: (value) => emit('update:drawer', value),
});
</script>
