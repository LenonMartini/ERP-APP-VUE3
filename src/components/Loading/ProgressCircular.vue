<template>
  <div
    v-if="loadingStore.isLoading"
    class="global-loading"
  >
    <v-progress-circular
      indeterminate
      :size="size"
      :width="width"
      :color="color"
    />
  </div>
</template>

<script setup>
import { useLoadingStore } from '@/stores/loading'

const loadingStore = useLoadingStore()

defineProps({
  size: { type: Number, default: 56 },
  width: { type: Number, default: 4 },
  color: { type: String, default: 'primary' },
})
</script>

<style scoped>
.global-loading {
  position: fixed;
  inset: 0; /* top:0 right:0 bottom:0 left:0 */
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.6); /* overlay escuro */
  z-index: 9999; /* acima de tudo */
}
</style>
