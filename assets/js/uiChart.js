import uiHTML from "./uiHTML.js";

// =============================================
//
// Chart UI
// chart.js library imported in html
// https://cdn.jsdelivr.net/npm/chart.js
//
// =============================================

let myChart, chartCtx;

function updateChart(config) {
    if (myChart?.ctx && config.type !== myChart.config.type) {
        console.log(config.type, myChart);
        myChart.destroy();
    }

    if (!myChart?.ctx) return setNewChart(config);

    myChart.config.options = config.options;
    myChart.config.data = config.data;
    myChart.update();

    // myChart.reset();
    // console.log(config);
    // myChart.update();
}

function setNewChart(config) {
    if (!document.querySelector("#myChart")) {
        chartCtx = uiHTML.newDOMElement("canvas", {
            parent: document.body,
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

function cityChartFromData(countryData) {
    const config = {
        type: countryData["populationCounts"].length > 1 ? "line" : "bar",
        data: {
            labels: countryData["populationCounts"].map((data) => data["year"]),
            datasets: [
                {
                    label: "population",
                    data: countryData["populationCounts"].map((data) =>
                        Math.round(data["value"])
                    ),
                    borderColor: uiHTML.generateColorFromString(
                        countryData["city"],
                        0.8
                    ),
                    backgroundColor: uiHTML.generateColorFromString(
                        countryData["city"],
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
            plugins: { title: { text: countryData["city"], display: true } },
            pointBackgroundColor: "#fff",
        },
    };
    updateChart(config);
}

function countryChartFromData(countryData) {
    const config = {
        type: countryData["populationCounts"].length > 1 ? "line" : "bar",
        data: {
            labels: countryData["populationCounts"].map((data) => data["year"]),
            datasets: [
                {
                    label: "population",
                    data: countryData["populationCounts"].map((data) =>
                        Math.round(data["value"])
                    ),
                    borderColor: uiHTML.generateColorFromString(
                        countryData["country"],
                        0.8
                    ),
                    backgroundColor: uiHTML.generateColorFromString(
                        countryData["country"],
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
            plugins: { title: { text: countryData["country"], display: true } },
            pointBackgroundColor: "#fff",
        },
    };
    updateChart(config);
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

export default { updateChart, cityChartFromData, countryChartFromData };
