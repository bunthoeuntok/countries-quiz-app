<script setup>
import { computed, ref } from 'vue'
import { useCountries } from '../composables/useCountries'
import CountryModal from '../components/CountryModal.vue'

const countries = useCountries()
const isAsc = ref(true)
const search = ref('')
const currentPage = ref(1)
const totalPage = ref(0)

const searchCountries = () => {
  return countries.value.filter(country =>
    country.name.official.toLowerCase().includes(search.value.toLowerCase())
  )
}

const toggleSort = () => (isAsc.value = !isAsc.value)

const sortContries = data => {
  return data.sort((a, b) => {
    if (a.name.official.toUpperCase() > b.name.official.toUpperCase()) {
      return isAsc.value ? 1 : -1
    } else if (a.name.official.toUpperCase() < b.name.official.toUpperCase()) {
      return isAsc.value ? -1 : 1
    }
    return 0
  })
}

const getIdd = idd => {
  if (Object.keys(idd).length) {
    return idd.suffixes.map(suffix => idd.root + suffix).join(', ')
  }
}

const getNativeName = nativeName => {
  if (nativeName) {
    let key = Object.keys(nativeName)[0]
    return nativeName[key].official
  }
}

const paginate = data => {
  totalPage.value = Math.ceil(data.length / 25)
  let minIndex = (currentPage.value - 1) * 25
  let maxIndex = currentPage.value * 25 - 1

  return data.filter((item, index) => index >= minIndex && index <= maxIndex)
}

const goToPage = page => (currentPage.value = page)

const results = computed(() => {
  let filtered = searchCountries()
  let sortedResults = sortContries(filtered)

  return paginate(sortedResults)
})
</script>

<template>
  <h1>Countries List</h1>
  <input type="text" v-model="search" /> <br />

  <div class="container mx-auto font-futura antialiased py-16">
    <table class="w-full text-md text-left text-gray-600">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr class="bg-gray-300">
          <th scope="col" class="px-6 py-3 text-left">No</th>
          <th scope="col" class="px-6 py-3 text-center">Flag</th>
          <th
            scope="col"
            class="px-6 py-3 text-left cursor-pointer"
            @click="toggleSort()"
          >
            <div class="flex justify-between items-center whitespace-nowrap">
              <span>Country Name</span>
              <div :class="{ 'rotate-180 duration-100': !isAsc }">
                <span>&uarr;</span>
              </div>
            </div>
          </th>
          <th scope="col" class="px-6 py-4 text-center">CCA2</th>
          <th scope="col" class="px-6 py-4 text-center">CCA3</th>
          <th scope="col" class="px-6 py-4 text-left whitespace-nowrap">
            Native Name
          </th>
          <th scope="col" class="px-6 py-4 text-left whitespace-nowrap">
            Alternative Name
          </th>
          <th scope="col" class="px-6 py-4 text-center whitespace-nowrap">
            Calling Codes
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(country, index) in results"
          :key="country.name.official"
          class="bg-white border-b"
        >
          <td scope="row" class="px-6 py-4 w-10 text-center font-medium">
            {{ index + 1 }}
          </td>
          <td class="px-6 py-4 w-20 text-center">
            <img :src="country.flags.png" class="w-12 rounded-sm" />
          </td>
          <td class="px-6 py-4 text-left">
            <CountryModal :country="country" />
          </td>
          <td class="px-6 py-4 text-center">{{ country.cca2 }}</td>
          <td class="px-6 py-4 text-center">{{ country.cca3 }}</td>
          <td class="px-6 py-4 text-left">
            {{ getNativeName(country.name.nativeName) }}
          </td>
          <td
            class="px-6 py-4 text-left"
            v-html="country.altSpellings.join('<br />')"
          ></td>
          <td class="px-6 py-4 text-center">
            {{ getIdd(country.idd) }}
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="totalPage > 0">
      <button v-for="index in totalPage" :key="index" @click="goToPage(index)">
        {{ index }}
      </button>
    </div>
  </div>
</template>
