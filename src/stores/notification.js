import { defineStore } from "pinia";


export const useNotificationStore = defineStore("notification", {
  state: () => ({
    show: false,
    message: '',
    color: 'success',
  }),
  actions: {
    notify(message, color = 'success') {
      this.message = message
      this.color = color
      this.show = true
    },
    clear() {
      this.message = ''
      this.color = 'success'
      this.show = false
    },

  },
})
