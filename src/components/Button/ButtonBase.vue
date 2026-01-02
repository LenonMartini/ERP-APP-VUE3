<template>
  <v-btn
    :type="type"
    :color="color"
    :variant="variant"
    :size="size"
    :loading="loading"
    :disabled="disabled || loading"
    :block="block"
    :icon="iconOnly"
    @click="$emit('click')"
  >
    <!-- Ícone à esquerda -->
    <v-icon
      v-if="icon && !iconOnly"
      start
    >
      {{ icon }}
    </v-icon>

    <!-- Texto -->
    <slot />

    <!-- Ícone à direita -->
    <v-icon
      v-if="iconRight && !iconOnly"
      end
    >
      {{ iconRight }}
    </v-icon>
  </v-btn>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  color: {
    type: String,
    default: 'primary',
  },
  variant: {
    type: String,
    default: 'flat',
  },
  size: {
    type: String,
    default: 'default',
  },
  loading: Boolean,
  disabled: Boolean,
  block: Boolean,

  /**
   * Ícones
   */
  icon: String,        // esquerda
  iconRight: String,  // direita
  iconOnly: Boolean,  // botão só ícone
})

defineEmits(['click'])
</script>
