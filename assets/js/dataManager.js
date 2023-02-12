import api from "./api.js";
import db from "./db.js";

// ============================================
//
// Get data from localStorage if exists
// else get it from API
//
// ============================================

// Module "global" variables (comes with functions closure)
let allCountriesWithContinents;
let allCountriesWithPopulation;
let allCitiesWithPopulation;

async function loadAllDataFromAPIs() {
    allCountriesWithContinents = db.getDataFromDb("allCountriesWithContinents");
    allCountriesWithPopulation = db.getDataFromDb("allCountriesWithPopulation");
    allCitiesWithPopulation = db.getDataFromDb("allCitiesWithPopulation");
    if (
        !allCountriesWithContinents ||
        !allCountriesWithPopulation ||
        !allCitiesWithPopulation
    ) {
        const results = await Promise.all([
            api.getAllCountriesWithContinent(),
            api.getAllCountriesWithPopulation(),
            api.getAllCitiesWithPopulation(),
        ]);
        if (results.every((res) => res)) {
            allCountriesWithContinents = results[0];
            allCountriesWithPopulation = results[1];
            allCitiesWithPopulation = results[2];
            console.log("Data loaded fro all APIs");
            saveDataToLocalStorage();
            console.log("Data saved to local database");
        } else {
            console.info("API failed");
            return 0;
        }
    }
    console.log("Working with data from local database");
    db.getLocalStorageSize();
    return 1;
}

// ============================================
//
// Update Database
//
// ============================================

function saveDataToLocalStorage() {
    db.clearDB();
    db.writeDataToDb("allCountriesWithContinents", allCountriesWithContinents);
    db.writeDataToDb("allCountriesWithPopulation", allCountriesWithPopulation);
    db.writeDataToDb("allCitiesWithPopulation", allCitiesWithPopulation);
    db.getLocalStorageSize();
}

// ============================================
//
// Data massaging
//
// ============================================

function getContinents() {
    return Array.from(
        allCountriesWithContinents.reduce(
            (continents, country) =>
                continents.add(country["continents"].join("")),
            new Set()
        )
    );
}

function getCountriesWithCodes() {
    return allCountriesWithContinents
        .map((country) => [
            country["name"]["common"],
            country["cca2"],
            country["continents"].join(""),
        ])
        .filter((el) => el.length);
}

function getCountryNamesOfContinent(countries, continent) {
    return countries
        .filter(
            (country) =>
                country["continents"].join("").toLowerCase() ===
                continent.toLowerCase()
        )
        .map((country) => country["name"]["common"])
        .filter((el) => el.length)
        .sort();
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
                countries.filter((country) =>
                    country["country"].includes(countryName)
                )[0]
        )
        .filter((country) => country?.hasOwnProperty("populationCounts"))
        .map((country) => ({
            // sort population by years
            country: country["country"],
            code: country["code"],
            populationCounts: country["populationCounts"].sort(
                (a, b) => a["year"] - b["year"]
            ),
        }));
}

function filterCitiesByNames(cities, cityNames) {
    return cityNames
        .map(
            (cityName) => cities.filter((city) => city["city"] === cityName)[0]
        )
        .filter((city) => city?.hasOwnProperty("populationCounts"))
        .map((city) => ({
            // sort population by years
            city: city["city"],
            country: city["country"],
            populationCounts: city["populationCounts"].sort(
                (a, b) => a["year"] - b["year"]
            ),
        }));
}

function getCitiesOfCountry(countryName) {
    return allCitiesWithPopulation
        .filter((city) => city["country"].includes(countryName))
        .map((city) => [city["city"], city["populationCounts"]])
        .filter((city) => city.length)
        .sort();
}

function getPopulationOfCountry(countryName) {
    return filterCountriesByNames(allCountriesWithPopulation, [countryName])[0];
}

function getPopulationOfCity(cityName) {
    return filterCitiesByNames(allCitiesWithPopulation, [cityName])[0];
}

function getAllCountriesNames(data) {}

function getAllCitiesNames(data) {}

export default {
    loadAllDataFromAPIs,
    saveDataToLocalStorage,
    getContinents,
    getCountriesWithCodes,
    getCountryNamesOfContinent,
    getAllCountriesNames,
    getAllCitiesNames,
    filterCountriesByNames,
    getCitiesOfCountry,
    getCountriesOfContinent,
    getPopulationOfCountry,
    getPopulationOfCity,
};
