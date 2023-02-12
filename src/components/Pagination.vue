<script setup>
const props = defineProps({
  totalPage: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
  },
})

defineEmits(['currentPageChange'])
</script>

<template>
  <div v-if="totalPage > 0" class="flex space-x-1 justify-end mt-4">
    <button
      v-for="pageNumber in totalPage"
      :key="pageNumber"
      :class="[
        'bg-gray-200 px-4 py-2 text-sm rounded-md',
        pageNumber === currentPage ? 'bg-gray-400' : '',
      ]"
      @click="$emit('currentPageChange', pageNumber)"
    >
      {{ pageNumber }}
    </button>
  </div>
</template>
