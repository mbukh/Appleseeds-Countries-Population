// api request sequence and commands
// by Artyom Ribakov
// https://restcountries.com/#api-endpoints-v3-capital-city
// https://restcountries.com/v3.1/region/europe

async function getAllCountries() {
    const api = "./assets/js/all.json";
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

export default {
    getAllCountries,
    getContinentsFromAllCountries,
    getCountriesByContinent,
};

// fetch("https://restcountries.com/v3.1/region/europe", {
//     method: "GET",
//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//     },
// });

// fetch("https://restcountries.com/v3.1/region/africa", {
//     method: "GET",
//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//     },
// });

// fetch("https://restcountries.com/v3.1/region/asia", {
//     method: "GET",
//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//     },
// });

// fetch("https://restcountries.com/v3.1/region/americas", {
//     method: "GET",
//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//     },
// });

// fetch("https://restcountries.com/v3.1/region/oceania", {
//     method: "GET",
//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//     },
// });

// // !!!!!!!postman:!!!!!!!!

// //
// // get country :

// fetch("https://countriesnow.space/api/v0.1/countries/population", {
//     method: "POST",
//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ country: "nigeria" }),
// });

// //
// // get all cities of a country // will get us only cities with population data.. :

// fetch(
//     "https://countriesnow.space/api/v0.1/countries/population/cities/filter",
//     {
//         method: "POST",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             limit: 1000,
//             order: "asc",
//             orderBy: "name",
//             country: "nigeria",
//         }),
//     }
// );

// //
// //get info about a specific city

// fetch("https://countriesnow.space/api/v0.1/countries/population/cities", {
//     method: "POST",
//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//         city: "Akure",
//     }),
// });
