<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="420"
    attach="body"
    :z-index="3000"
  >
    <v-card>
      <slot />
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
