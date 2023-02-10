// api request sequence and commands
// by Artyom Ribakov

async function getAllCountriesWithContinent() {
    // https://restcountries.com/v3.1/all
    const api = "./assets/js/countriesWithContinents.json";
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
        },
    };
    try {
        const response = await fetch(api, options);
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

function getContinentsFromAllCountries(countries) {
    return Array.from(
        countries.reduce(
            (continents, country) => continents.add(country.region),
            new Set()
        )
    );
}

function getCountriesByContinent(countries, continent) {
    return countries
        .filter((country) => country.region === continent)
        .map((country) => country.name.common);
}

async function getAllCountriesWithPopulation() {
    // https://countriesnow.space/api/v0.1/countries/population
    const api = "./assets/js/countriesWithPopulation.json";
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
        },
    };
    try {
        const response = await fetch(api, options);
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data["data"];
    } catch (err) {
        console.log(err);
    }
}

async function getAllCitiesWithPopulation() {
    // https://countriesnow.space/api/v0.1/countries/population/cities
    const api = "./assets/js/citiesWithPopulation.json";
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
        },
    };
    try {
        const response = await fetch(api, options);
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data["data"];
    } catch (err) {
        console.log(err);
    }
}

function getCitiesByCountry(allCountriesWithCities, countryName) {
    return allCountriesWithCities.filter(
        (country) => country.country === countryName
    )[0].cities;
}

export default {
    getAllCountriesWithContinent,
    getContinentsFromAllCountries,
    getCountriesByContinent,
    getAllCountriesWithPopulation,
    getAllCitiesWithPopulation,
};
