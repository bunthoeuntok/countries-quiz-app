<script setup>
import { computed, ref } from 'vue'
import { useCountries } from '../composables/useCountries'
import CountryModal from '../components/CountryModal.vue'

const countries = useCountries()
const isAsc = ref(true)
const search = ref('')
const currentPage = ref(1)
const totalPage = ref(0)

const toggleSort = () => (isAsc.value = !isAsc.value)

const paginate = list => {
  totalPage.value = Math.ceil(list.length / 25)
  let minIndex = (currentPage.value - 1) * 25
  let maxIndex = currentPage.value * 25 - 1

  return list.filter((item, index) => index >= minIndex && index <= maxIndex)
}

const goToPage = page => (currentPage.value = page)

const results = computed(() => {
  let filtered = countries.value.filter(country =>
    country.name.official.toLowerCase().includes(search.value.toLowerCase())
  )

  let sortedResults = filtered.sort((a, b) => {
    if (a.name.official.toUpperCase() > b.name.official.toUpperCase()) {
      return isAsc.value ? 1 : -1
    } else if (a.name.official.toUpperCase() < b.name.official.toUpperCase()) {
      return isAsc.value ? -1 : 1
    }
    return 0
  })

  return paginate(sortedResults)
})
</script>

<template>
  <h1>Countries List</h1>
  <button @click="toggleSort()">Sort</button> <br />
  <input type="text" v-model="search" /> <br />

  <div v-if="totalPage > 0">
    <button v-for="index in totalPage" :key="index" @click="goToPage(index)">
      {{ index }}
    </button>
  </div>

  <table>
    <thead>
      <tr>
        <th>No</th>
        <th>Country Name</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(country, index) in results" :key="country.name.official">
        <td>{{ index + 1 }}</td>
        <td>
          <CountryModal :country="country" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
