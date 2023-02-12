<script setup>
import { ref } from 'vue'

const show = ref(false)
const { country } = defineProps({
  country: {
    type: Object,
    reuqired: true,
  },
})

const getIdd = idd => {
  if (Object.keys(idd).length) {
    return idd.suffixes.map(suffix => idd.root + suffix).join(', ')
  }
  return 'N/A '
}

const getNativeName = nativeName => {
  if (nativeName) {
    let key = Object.keys(nativeName)[0]
    return nativeName[key].official
  }
  return 'N/A'
}

const toggleModal = () => (show.value = !show.value)
</script>

<template>
  <!-- Modal toggle -->
  <span class="text-blue-700 underline cursor-pointer" @click="toggleModal()">{{
    country.name.official
  }}</span>

  <!-- Main modal -->
  <div
    v-show="show"
    class="fixed inset-0 bg-black bg-opacity-40 w-screen h-screen overflow-x-hidden px-10 overflow-y-auto backdrop-blur-sm font-futura text-gray-700"
  >
    <div
      class="mx-auto max-w-5xl bg-white w-full md:w-4/5 mt-40 rounded-md shadow-lg"
    >
      <div class="px-8 py-4 border-b border-gray-200 flex justify-between">
        <h1 class="text-2xl text-blue-900 font-medium">
          {{ country.name.official }}
        </h1>
        <button
          @click="toggleModal()"
          class="text-2xl font-bold w-12 h-12 items-center focus:text-gray-600"
        >
          &times;
        </button>
      </div>
      <div class="px-8 py-4 border-b border-gray-200">
        <div class="grid md:grid-cols-2 grid-cols-1 gap-6">
          <img :src="country.flags.png" class="w-full rounded-lg" alt="" />
          <div class="space-y-2">
            <div class="grid grid-cols-2 gap-2">
              <p>Country Name:</p>
              <p class="font-bold">{{ country.name.official }}</p>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <p>CCA2:</p>
              <p>{{ country.cca2 }}</p>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <p>CCA3:</p>
              <p>{{ country.cca3 }}</p>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <p>Native Name:</p>
              <p>{{ getNativeName(country.name.nativeName) }}</p>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <p>Alternative Name:</p>
              <p v-html="country.altSpellings.join('<br />')"></p>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <p>Calling codes:</p>
              <p>{{ getIdd(country.idd) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="px-8 py-4 flex justify-end">
        <button
          @click="toggleModal()"
          class="px-8 rounded-sm py-2 bg-rose-600 text-white focus:bg-rose-500"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
