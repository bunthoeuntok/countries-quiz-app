import { ref } from 'vue'

export function useCountries() {
  // get countries from local storage if
  const getCountries = () => JSON.parse(localStorage.getItem('quiz-countries'))

  // set countries from api and store it to local storage
  const setCountries = async () => {
    await fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('quiz-countries', JSON.stringify(data))
      })
      .catch(err => {
        localStorage.removeItem('quiz-countries')
      })
  }

  const getNativeName = nativeName => {
    if (nativeName) {
      let key = Object.keys(nativeName)[0]
      return nativeName[key].official
    }
    return 'N/A'
  }

  const getIdd = idd => {
    if (Object.keys(idd).length) {
      return idd.suffixes.map(suffix => idd.root + suffix).join(', ')
    }
    return 'N/A '
  }

  // get countries if exist in local storate
  let value = getCountries()

  // if not exist get from api
  if (!value) {
    setCountries()
    value = getCountries()
  }
  // assign value to countries ref
  const countries = ref(value)
  return { countries, getNativeName, getIdd }
}
