<template>
  <v-text-field
    v-model="value"
    :label="label"
    :type="type"
    :variant="variant"
    :prepend-inner-icon="prependIcon"
    :append-inner-icon="appendIcon"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :clearable="clearable"
    :error-messages="errorMessage"
    :density="density"
  />
</template>

<script setup>
import { useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: String,
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  prependIcon: String,
  appendIcon: String,
  variant: {
    type: String,
    default: 'outlined',
  },
  density: {
    type: String,
    default: 'comfortable',
  },
  disabled: Boolean,
  readonly: Boolean,
  clearable: Boolean,
})

/**
 * vee-validate integration
 */
const { value, errorMessage } = useField(() => props.name)
</script>
