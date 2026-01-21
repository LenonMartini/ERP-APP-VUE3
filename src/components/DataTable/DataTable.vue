<template>
  <v-data-table
    :columns="columns"
    :items="items"
    :loading="loading"
    density="compact"
    item-key="id"
  >
    <!-- Cabeçalho -->
    <template #headers>
      <v-data-table-headers :columns="columns" />
    </template>

    <!-- Linhas -->
    <template #rows="{ items }">
      <v-data-table-rows
        :items="items"
      >
        <template #item="{ item }">
          <tr>
            <td v-for="col in columns" :key="col.key">
              <!-- Slot customizado -->
              <slot
                :name="`item.${col.key}`"
                :item="item"
              >
                {{ item.raw[col.key] }}
              </slot>
            </td>
          </tr>
        </template>
      </v-data-table-rows>
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
  columns: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
  loading: Boolean,
})
</script>
