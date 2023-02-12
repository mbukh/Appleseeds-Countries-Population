// api request sequence and commands

async function getAllCountriesWithContinent() {
    console.log("API: Talking to continents about countries");
    const api = "https://restcountries.com/v3.1/all";
    // const api = "./assets/js/countriesWithContinents.json";
    return await apiRequest(api);
}

async function getAllCountriesWithPopulation() {
    console.log("API: Talking to countries about population");
    const api = "https://countriesnow.space/api/v0.1/countries/population";
    // const api = "./assets/js/countriesWithPopulation.json";
    return (await apiRequest(api))["data"];
}

async function getAllCitiesWithPopulation() {
    console.log("API: Talking to cities about population");
    const api =
        "https://countriesnow.space/api/v0.1/countries/population/cities";
    // const api = "./assets/js/citiesWithPopulation.json";
    return (await apiRequest(api))["data"];
}

async function apiRequest(apiUrl, options = null) {
    if (!options)
        options = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json; charset=UTF-8",
            },
        };
    try {
        const response = await fetch(apiUrl, options);
        if (!response.ok)
            throw new Error("HTTP error. Status:", response.status);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log("Fetch error:", err);
    }
}

export default {
    getAllCountriesWithContinent,
    getAllCountriesWithPopulation,
    getAllCitiesWithPopulation,
};
