// api request sequence and commands

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

export default {
    getAllCountriesWithContinent,
    getAllCountriesWithPopulation,
    getAllCitiesWithPopulation,
};
