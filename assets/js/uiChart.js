import uiHTML from "./uiHTML.js";

// =============================================
//
// Chart UI
// chart.js library imported in html
// https://cdn.jsdelivr.net/npm/chart.js
//
// =============================================

// module global variable (function closure)
let myChart, chartCtx;

function updateChart(config) {
    // to force build new chart to fit screen area
    if (myChart?.ctx) myChart.destroy();
    return setNewChart(config);

    // myChart.config.options = config.options;
    // myChart.config.data = config.data;
    // myChart.update();
}

function setNewChart(config) {
    if (!document.querySelector("#myChart")) {
        chartCtx = uiHTML.newDOMElement("canvas", {
            parent: document.querySelector(".chart-container"),
            id: "myChart",
        });
    }
    if (!myChart?.ctx) {
        myChart = initChart(chartCtx, config);
    }
    return myChart;
}

function initChart(ctx, config) {
    return new Chart(ctx, config);
}

function cityChartFromData(cityData) {
    const config = {
        type: cityData["populationCounts"].length > 1 ? "line" : "bar",
        data: {
            labels: cityData["populationCounts"].map((data) => data["year"]),
            datasets: [
                {
                    label: "population",
                    data: cityData["populationCounts"].map((data) =>
                        Math.round(data["value"])
                    ),
                    borderColor: uiHTML.generateColorFromString(
                        cityData["city"],
                        0.8
                    ),
                    backgroundColor: uiHTML.generateColorFromString(
                        cityData["city"],
                        0.3
                    ),
                    fill: true,
                    radius: 8,
                    hoverRadius: 12,
                    borderWidth: 1,
                    hoverBorderWidth: 2,
                },
            ],
        },
        options: {
            plugins: { title: { text: cityData["city"], display: true } },
            pointBackgroundColor: "#fff",
            maintainAspectRatio: false,
        },
    };
    updateChart(config);
}

function countryChartFromData(countryData, countryName) {
    countryData = countryData
        .sort((a, b) => b[1][0]["value"] - a[1][0]["value"])
        .slice(0, 15);
    if (!countryData.length) return false;
    const config = {
        type: "bar",
        data: {
            labels: countryData.map((data) => data[0]),
            datasets: [
                {
                    label: `cities with biggest population`,
                    data: countryData.map((data) =>
                        Math.round(data[1][0]["value"])
                    ),
                    borderColor: countryData.map(
                        (data) => uiHTML.generateColorFromString(data[0]),
                        0.8
                    ),
                    backgroundColor: countryData.map(
                        (data) => uiHTML.generateColorFromString(data[0]),
                        0.3
                    ),
                    fill: false,
                    radius: 2,
                    hoverRadius: 12,
                    borderWidth: 1,
                    hoverBorderWidth: 2,
                },
            ],
        },
        options: {
            plugins: { title: { text: countryName, display: true } },
            pointBackgroundColor: "#fff",
            maintainAspectRatio: false,
        },
    };
    updateChart(config);
}

function destroyChart() {
    if (myChart?.ctx) myChart.destroy();
}

// function addData(labels, dataset) {
//     labels.foreach((label) => chart.data.labels.push(label));
//     myChart.data.datasets.forEach((dataset) => {
//         dataset.data.push(data);
//     });
//     chart.update();
// }

// function removeData() {
//     myChart.data.labels.pop();
//     myChart.data.datasets.forEach((dataset) => {
//         dataset.data.pop();
//     });
//     myChart.update();
// }

export default {
    updateChart,
    cityChartFromData,
    countryChartFromData,
    destroyChart,
};
