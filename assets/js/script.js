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
    const resCode = await dataManager.loadAllDataFromAPIs();
    switch (resCode) {
        case 0:
            throw new Error("Failed to load data. Connection error.");
        case 2:
            dataManager.saveDataToLocalStorage();
    }
    uiHTML.removeLoadingScreen();
} catch (error) {
    uiHTML.showLoadingErrorMessage(error);
    // Stop program from running
    throw new Error(error);
}

// =============================================
//
// Event listeners
//
// =============================================

window.addEventListener("load", doMap);

window.addEventListener("load", doContinents);

window.addEventListener("load", function activateContinentsButtons() {
    document.querySelector("#continents").addEventListener("click", (e) => {
        if (!e.target.classList.contains("continent")) return;
        console.log(`Getting countries of ${e.target.innerText}`);
        doCountries(e.target.innerText);
        uiHTML.clearElement(document.querySelector("#cities"));
    });
});

function activateCountriesButtons() {
    document.querySelector("#countries").addEventListener("click", (e) => {
        if (!e.target.classList.contains("name")) return;
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
        showCityChart(e.target.parentElement.dataset.name);
    });
}

// =============================================
//
// Event handlers
//
// =============================================

// map
function doMap() {
    globalThis.simplemaps_worldmap.hooks.click_state = function (id) {
        showCountryChart(simplemaps_worldmap_mapdata.state_specific[id].name);
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
