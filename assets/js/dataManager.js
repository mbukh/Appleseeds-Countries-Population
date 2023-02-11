import api from "./api.js";
import db from "./db.js";

// ============================================
//
// Get data from localStorage if exists
// else check from API
//
// ============================================
const allCountriesWithContinents =
    db.getDataFromDb("allCountriesWithContinents") ||
    (await api.getAllCountriesWithContinent());

const allCountriesWithPopulation =
    db.getDataFromDb("allCountriesWithPopulation") ||
    (await api.getAllCountriesWithPopulation());

const allCitiesWithPopulation =
    db.getDataFromDb("allCitiesWithPopulation") ||
    (await api.getAllCitiesWithPopulation());

// ============================================
//
// Update Database
// db.clearDB();
//
// ============================================

db.writeDataToDb("allCountriesWithContinents", allCountriesWithContinents);
db.writeDataToDb("allCountriesWithPopulation", allCountriesWithPopulation);
db.writeDataToDb("allCitiesWithPopulation", allCitiesWithPopulation);
db.getLocalStorageSize();

// ============================================
//
// Data massaging
//
// ============================================

function getContinents() {
    return Array.from(
        allCountriesWithContinents.reduce(
            (continents, country) => continents.add(country.region),
            new Set()
        )
    );
}

function getCountryNamesOfContinent(countries, continent) {
    return countries
        .filter(
            (country) =>
                country.region.toLowerCase() === continent.toLowerCase()
        )
        .map((country) => country.name.common)
        .filter((el) => el.length);
}

function getCountriesOfContinent(continentName) {
    const countryNames = getCountryNamesOfContinent(
        allCountriesWithContinents,
        continentName
    );
    const countries = filterCountriesByNames(
        allCountriesWithPopulation,
        countryNames
    );
    const countriesAndPopulation = countries.map((country) => [
        country["country"],
        country["populationCounts"],
    ]);
    return countriesAndPopulation;
}

function filterCountriesByNames(countries, countryNames) {
    return countryNames
        .map(
            (countryName) =>
                countries.filter(
                    (country) => country["country"] === countryName
                )[0]
        )
        .filter((country) => country?.hasOwnProperty("populationCounts"));
}

function filterCitiesByNames(cities, cityNames) {
    return cityNames
        .map(
            (cityName) => cities.filter((city) => city["city"] === cityName)[0]
        )
        .filter((city) => city?.hasOwnProperty("populationCounts"));
}

function getCitiesOfCountry(countryName) {
    return allCitiesWithPopulation
        .filter((city) => city["country"].includes(countryName))
        .map((city) => [city["city"], city["populationCounts"]])
        .filter((city) => city.length);
}

function getPopulationOfCountry(countryName) {
    const countryData = filterCountriesByNames(allCountriesWithPopulation, [
        countryName,
    ]);
    console.log(countryData);
}

function getPopulationOfCity(cityName) {
    return filterCitiesByNames(allCitiesWithPopulation, [cityName])[0];
}

function getAllCountriesNames(data) {}

function getAllCitiesNames(data) {}

export default {
    getContinents,
    getCountryNamesOfContinent,
    getAllCountriesNames,
    getAllCitiesNames,
    filterCountriesByNames,
    getCitiesOfCountry,
    getCountriesOfContinent,
    getPopulationOfCountry,
    getPopulationOfCity,
};
