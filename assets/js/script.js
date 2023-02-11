import dataManager from "./dataManager.js";
import uiHTML from "./uiHTML.js";
import uiChart from "./uiChart.js";

//
(function doContinents() {
    const continents = dataManager.getContinents();
    uiHTML.updateContinentsButtons(continents);
})();

//
function doCountries(continent) {
    const countriesOfContinent = dataManager.getCountriesOfContinent(continent);
    uiHTML.updateCountriesButtons(countriesOfContinent);
    activateCountriesButtons();
}

//
function doCities(country) {
    const citiesOfCountry = dataManager.getCitiesOfCountry(country);
    uiHTML.updateCitiesButtons(citiesOfCountry);
    activateCitiesChart();
}

// =============================================
//
// Event listeners
//
// =============================================

(function activateContinentsButtons() {
    document.querySelector("#continents").addEventListener("click", (e) => {
        if (!e.target.classList.contains("continent")) return;
        console.log(`Getting countries of ${e.target.innerText}`);
        doCountries(e.target.innerText);
        uiHTML.clearElement(document.querySelector("#cities"));
    });
})();

function activateCountriesButtons() {
    document.querySelector("#countries").addEventListener("click", (e) => {
        if (!e.target.classList.contains("country")) return;
        console.log(`Getting cities of ${e.target.dataset.name}`);
        doCities(e.target.dataset.name);
    });
}

function activateCountriesChart() {
    document.querySelector("#countries").addEventListener("click", (e) => {
        if (
            !e.target.parentElement.classList.contains("country") ||
            e.target.tagName.toLowerCase() !== "span"
        )
            return;

        console.log(
            `Getting population by year ${e.target.innerText} for ${e.target.parentElement.dataset.name}`
        );
        // updateChart();
    });
}

function activateCitiesChart() {
    document.querySelector("#cities").addEventListener("click", (e) => {
        if (!e.target.classList.contains("city")) return;
        console.log(`Getting population of ${e.target.dataset.name}`);
        const cityData = dataManager.getPopulationOfCity(e.target.dataset.name);
        console.log(cityData);
        const options = {
            plugins: { title: { text: cityData["city"], display: true } },
            data: {
                labels: cityData["populationCounts"].map((data) =>
                    Math.round(data["year"])
                ),
                datasets: [
                    {
                        label: "population",
                        data: cityData["populationCounts"].map(
                            (data) => data["value"]
                        ),
                    },
                ],
            },
        };
        uiChart.updateChart(options);
    });
}
