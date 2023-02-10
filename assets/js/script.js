// import "./chart";
import api from "./api.js";
import uiHTML from "./uiHTML.js";
import chart from "./chart.js";

const ctx = document.getElementById("myChart");

//
// continents

const allCountries = await api.getAllCountries();
const htmlContinentsDiv = document.createElement("div");
const continents = api.getContinentsFromAllCountries(allCountries);
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
    allCountries,
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

// Fiji - change with event
const country = continents[3];

const allCountriesWithCities = api.getAllCountriesWithCities();
const citiesOfCountry = api.getCitiesByCountry(country);
const citiesButtons = uiHTML.newElementsFromList(citiesOfCountry, {
    elementType: "a",
    classList: ["city"],
});

const htmlCitiesDiv = document.createElement("div");
htmlCitiesDiv.append(...countriesButtons);
htmlCountriesDiv.after(htmlCitiesDiv);

// chart ui

chart.initChart(ctx);
