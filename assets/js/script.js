// import "./chart";
import api from "./api.js";
import uiHTML from "./uiHTML.js";

const container = document.createElement("div");
document.body.prepend(container);

const allCountries = await api.getAllCountries();

const continents = api.getContinentsFromAllCountries(allCountries);
const continentsButtons = uiHTML.newElementsFromList(continents, {
    elementType: "a",
    classList: ["continent"],
});
container.prepend(...continentsButtons);

const continent = continents[2]; // Oceania
const countriesOfContinent = api.getCountriesByContinent(
    allCountries,
    continent
);
const countriesButtons = uiHTML.newElementsFromList(countriesOfContinent, {
    elementType: "a",
    classList: ["country"],
});
container.append(...countriesButtons);
