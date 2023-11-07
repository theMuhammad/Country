const countriesContainer = document.querySelector(".countries-container")
const filterByRegion = document.querySelector(".filter-by-region")
const searchInput = document.querySelector(".search-container input")

export function loader(state) {
  if (state) {
    overlay.classList.remove("d-none")
  } else {
    overlay.classList.add("d-none")
  }
}

let allCountriesData

const getData = async () => {
  loader(true)
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      renderCountries(data)
      allCountriesData = data
      loader(false)
    })
}

getData()

filterByRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries)
})

function renderCountries(data) {
  countriesContainer.innerHTML = ""
  data.forEach((country) => {
    const countryCard = document.createElement("a")
    countryCard.classList.add("country-card")
    countryCard.href = `./country.html?name=${country.name.common}`
    countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
                "en-EH"
              )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `
    console.log(countryCard.hreg)
    countriesContainer.append(countryCard)
  })
}

searchInput.addEventListener("input", (e) => {
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  )
  renderCountries(filteredCountries)
})

const themeChanger = document.querySelector(".theme-changer")

const savedTheme = localStorage.getItem("theme")
if (savedTheme) {
  document.body.classList.add(savedTheme) // Apply the saved theme
}

themeChanger.addEventListener("click", () => {
  document.body.classList.toggle("dark")
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark")
  } else {
    localStorage.removeItem("theme", "dark")
  }
})
