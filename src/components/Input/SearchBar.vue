<template>
  <div class="d-flex align-center">
    <v-text-field
      v-model="model"
      label="Pesquisar"
      placeholder="Pesquisar"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      density="compact"
      hide-details
      clearable
      class="mr-2"
      style="min-width: 380px"
      @keyup.enter="emitSearch"
    />
    
  </div>
</template>

<script setup>
const model = defineModel({
  type: String,
  default: '',
})

const emit = defineEmits(['search'])

const emitSearch = () => {
  emit('search', model.value)
}
</script>
