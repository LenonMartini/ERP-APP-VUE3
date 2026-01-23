<template>
  <ModalBase v-model="modelValue">
    <v-card-title class="text-h6">
      {{ title }}
    </v-card-title>

    <v-card-text>
      <slot>{{ message }}</slot>
    </v-card-text>

    <v-card-actions class="justify-end gap-2">
      <v-btn
        variant="text"
        @click="$emit('update:modelValue', false)"
        :disabled="loading"
      >
        Cancelar
      </v-btn>

      <v-btn
        color="error"
        :loading="loading"
        @click="$emit('confirm')"
      >
        {{ confirmText }}
      </v-btn>
    </v-card-actions>
  </ModalBase>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    default: 'Confirmação',
  },
  message: {
    type: String,
    default: 'Tem certeza?',
  },
  confirmText: {
    type: String,
    default: 'Sim, confirmar',
  },
  loading: {
    type: Boolean,
    default: false,
  },

})

</script>
