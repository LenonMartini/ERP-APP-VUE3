<template>
  <v-btn
    icon
    size="x-small"
    :color="color"
    :to="to"
    :href="href"
    :tag="buttonTag"
    :variant="variant"
  >
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  to: {
    type: [String, Object],
    default: null,
  },
  href: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: 'primary',
  },
  icon: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'outlined',
  }
})

const buttonTag = computed(() => {
  if (props.to) return 'router-link'
  if (props.href) return 'a'
  return 'button'
})
</script>
