<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div
    class="relative flex items-center border-2 bg-white border-gray-400 rounded-md"
  >
    <input
      type="text"
      :value="props.modelValue"
      autofocus
      @input="$emit('update:modelValue', $event.target.value)"
      class="h-10 pl-10 py-2 rounded-md focus:outline-none focus-within:bg-gray-100"
      placeholder="Search..."
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6 left-2 absolute text-gray-400 font-bold"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  </div>
</template>
