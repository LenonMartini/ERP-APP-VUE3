<template>
  <v-data-table
    :headers="columns"
    :items="items"
    :loading="loading"
    density="compact"
    item-key="id"
  >
    <!-- Slots de célula -->
    <template
      v-for="col in columns"
      :key="col.key"
      #[`item.${col.key}`]="{ item, value }"
    >
      <slot
        :name="`item.${col.key}`"
        :item="item"
        :value="value"
      >
        {{ value }}
      </slot>
    </template>

    <!-- Estado vazio -->
    <template #no-data>
      <slot name="empty">
        Nenhum registro encontrado
      </slot>
    </template>
  </v-data-table>
</template>

<script setup>
defineProps({
  columns: Array,
  items: Array,
  loading: Boolean,
})
</script>
