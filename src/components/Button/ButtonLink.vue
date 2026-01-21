<template>
  <v-btn
    :color="color"
    :variant="variant"
    :size="size"
    :block="block"
    :icon="iconOnly"
    :to="to"
    :href="href"
    :target="href ? '_blank' : undefined"
    :disabled="disabled"
    router
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
  /**
   * Navegação
   */
  to: {
    type: [String, Object],
    default: null,
  },
  href: {
    type: String,
    default: null,
  },

  /**
   * Aparência
   */
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
  block: Boolean,
  disabled: Boolean,

  /**
   * Ícones
   */
  icon: String,
  iconRight: String,
  iconOnly: Boolean,
})
</script>
