<template>
  <v-navigation-drawer v-model="localDrawer" app width="260" >
  <v-list nav density="comfortable">

    <template v-for="menu in menus" :key="menu.id">

      <!-- ITEM DIRETO -->
      <v-list-item
        v-if="!menu.children || menu.children.length === 0"
        :title="menu.name"
        :prepend-icon="menu.icon"
        :to="menu.url"
        link
      />

      <!-- ITEM COM FILHOS -->
      <v-list-group
        v-else
        :value="menu.id"
      >
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            :title="menu.name"
            :prepend-icon="menu.icon"
          />
        </template>

        <!-- FILHOS -->
        <v-list-item
          v-for="child in menu.children"
          :key="child.id"
          :title="child.name"
          :prepend-icon="child.icon"
          :to="child.url"
          link
        />

      </v-list-group>

    </template>

  </v-list>
</v-navigation-drawer>

</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { MenuService } from '@/services/MenuService';

const props = defineProps({
  drawer: {
    type: Boolean,
    required: true,
  },
});
const menus = ref([]);

const emit = defineEmits(['update:drawer']);

const localDrawer = computed({
  get: () => props.drawer,
  set: (value) => emit('update:drawer', value),
});

onMounted(() => {
  getMenus();
});

const getMenus = async() => {
  const response = await MenuService.findAll()

  menus.value = response;
}


</script>
