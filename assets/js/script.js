import dataManager from "./dataManager.js";
import uiHTML from "./uiHTML.js";
import uiChart from "./uiChart.js";
import mapData from "./map.js";

// =============================================
//
// Welcome screen && Data Loading (API + DB)
//
// =============================================

uiHTML.showLoadingScreen();

try {
    // prepare data
    const resCode = await dataManager.loadAllDataFromAPIs();
    if (!resCode) throw new Error("Failed to load data. Connection error.");
    uiHTML.removeLoadingScreen();
    // start here
    initEvents();
} catch (error) {
    uiHTML.showLoadingErrorMessage(error);
    // Stop program from running
    throw new Error(error);
}

// =============================================
//
// init
//
// =============================================

function initEvents() {
    doMap();
    doContinents();
    activateContinentsButtons();
}

// =============================================
//
// Event listeners
//
// =============================================

// clear database
document
    .querySelector(".clearDB a")
    .addEventListener("click", () => localStorage.clear());
//

function activateContinentsButtons() {
    document.querySelector("#continents").addEventListener("click", (e) => {
        if (!e.target.classList.contains("continent")) return;
        uiHTML.selectElement(e.target);
        console.log(`Getting countries of ${e.target.innerText}`);
        doCountries(e.target.innerText);
        uiHTML.clearElement(document.querySelector("#cities"));
    });
}

function activateCountriesButtons() {
    document.querySelector("#countries").addEventListener("click", (e) => {
        if (!e.target.classList.contains("name")) return;
        uiHTML.selectElement(e.target.parentElement);
        console.log(`Getting cities of ${e.target.parentElement.dataset.name}`);
        doCities(e.target.parentElement.dataset.name);
    });
}

// this works from map
// function activateCountriesChart() {
//     document.querySelector("#countries").addEventListener("click", (e) => {
//         if (!e.target.classList.contains("name")) return;
//         showCountryChart(e.target.parentElement.dataset.name);
//     });
// }

function activateCitiesButtons() {
    document.querySelector("#cities").addEventListener("click", (e) => {
        if (!e.target.classList.contains("name")) return;
        uiHTML.selectElement(e.target.parentElement);
        showCityChart(e.target.parentElement.dataset.name);
    });
}

// =============================================
//
// Events handlers
//
// =============================================

// map
function doMap() {
    globalThis.simplemaps_worldmap.hooks.click_state = function (id) {
        const countryName = simplemaps_worldmap_mapdata.state_specific[id].name;
        document
            .querySelector(".country.selected")
            ?.classList.remove("selected");
        console.log(`Getting population of ${countryName}`);
        showCountryChart(countryName);
        console.log(`Getting cities of ${countryName}`);
        doCities(countryName);
        uiHTML.clearElement(document.querySelector("#countries"));
    };
    mapData.initMapInfo();
    mapData.createMap();
}

//continents
function doContinents() {
    const continents = dataManager.getContinents();
    uiHTML.updateContinentsButtons(continents);
}

// countries
function doCountries(continent) {
    const countriesOfContinent = dataManager.getCountriesOfContinent(continent);
    uiHTML.updateCountriesButtons(countriesOfContinent);
    activateCountriesButtons();
}

function showCountryChart(countryName) {
    console.log(`Getting population of ${countryName}`);
    const countryData = dataManager.getPopulationOfCountry(countryName);
    uiChart.countryChartFromData(countryData);
}

// cities
function doCities(country) {
    const citiesOfCountry = dataManager.getCitiesOfCountry(country);
    uiHTML.updateCitiesButtons(citiesOfCountry);
    activateCitiesButtons();
}

function showCityChart(cityName) {
    console.log(`Getting population of ${cityName}`);
    const cityData = dataManager.getPopulationOfCity(cityName);
    uiChart.cityChartFromData(cityData);
}
