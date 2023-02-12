<script setup>
import { ref } from 'vue'

const show = ref(false)
const props = defineProps({
  country: {
    type: Object,
    reuqired: true,
  },
})

const toggleModal = () => (show.value = !show.value)
</script>

<template>
  <button v-if="!show" @click="toggleModal()">
    {{ country.name.official }}
  </button>
  <div v-else>show country detail</div>
</template>
