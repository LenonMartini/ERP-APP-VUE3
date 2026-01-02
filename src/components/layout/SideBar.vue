<template>
  <v-navigation-drawer
    v-model="localDrawer"
    app
    width="260"
  >
    <v-list nav density="comfortable">
      <v-list-item
        title="Dashboard"
        prepend-icon="mdi-view-dashboard"
        to="/dashboard"
        router
      />

      <v-list-item
        title="Usuários"
        prepend-icon="mdi-account-multiple"
        to="/users"
        router
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
  import { computed } from 'vue';
  const props = defineProps({
    drawer: {
      type: Boolean,
      required: true
    }
  });
  const emit = defineEmits(['update:drawer']);
  const localDrawer = computed({
   get: () => props.drawer,
   set: (value) => emit('update:drawer', value)
  });

</script>
