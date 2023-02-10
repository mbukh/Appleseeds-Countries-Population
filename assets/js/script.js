import api from "./api.js";
import uiHTML from "./uiHTML.js";
import chart from "./chart.js";
import db from "./db.js";

const ctx = document.getElementById("myChart");

const allCountriesWithContinents = await api.getAllCountriesWithContinent();
const allCountriesWithPopulation = await api.getAllCountriesWithPopulation();
const allCitiesWithPopulation = await api.getAllCitiesWithPopulation();

//
// continents

const htmlContinentsDiv = document.createElement("div");
const continents = api.getContinentsFromAllCountries(
    allCountriesWithContinents
);
const continentsButtons = uiHTML.newElementsFromList(continents, {
    elementType: "a",
    classList: ["continent"],
});
htmlContinentsDiv.prepend(...continentsButtons);
document.body.prepend(htmlContinentsDiv);

//
// countries

const continent = continents[2]; // Oceania - change with event
const countriesOfContinent = api.getCountriesByContinent(
    allCountriesWithContinents,
    continent
);
const countriesButtons = uiHTML.newElementsFromList(countriesOfContinent, {
    elementType: "a",
    classList: ["country"],
});

const htmlCountriesDiv = document.createElement("div");
htmlCountriesDiv.append(...countriesButtons);
htmlContinentsDiv.after(htmlCountriesDiv);

//
// cities

// // Fiji - change with event
// const country = countriesOfContinent[3];

// const allCountriesWithCities = await api.getAllCountriesWithCities();
// const citiesOfCountry = api.getCitiesByCountry(allCountriesWithCities, country);
// const citiesButtons = uiHTML.newElementsFromList(citiesOfCountry, {
//     elementType: "a",
//     classList: ["city"],
// });
// const htmlCitiesDiv = document.createElement("div");
// htmlCitiesDiv.append(...citiesButtons);
// htmlCountriesDiv.after(htmlCitiesDiv);

// chart ui

chart.initChart(ctx);

//
//db

db.writeDataToDb(allCountriesWithCities);
const newData = await db.getDataFromDb();
console.log(typeof newData);
db.getLocalStorageSize();
