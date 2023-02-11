import uiHTML from "./uiHTML.js";

// =============================================
//
// Chart UI
// chart.js library imported in html
// https://cdn.jsdelivr.net/npm/chart.js
//
// =============================================

let myChart, chartCtx;

function updateChart(options) {
    myChart = checkChartAndCanvas().myChart;
    console.log(options);
    myChart.data.labels = [...options.data.labels];
    myChart.data.datasets = [...options.data.datasets];
    // myChart.options.plugins = options.plugins;
    // myChart.reset();
    myChart.update();
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

function initChart(ctx) {
    return new Chart(ctx, {
        type: "bar",
        plugins: {
            title: {
                display: true,
                text: "Chart.js",
            },
        },
        data: {
            labels: ["A"],
            datasets: [
                {
                    label: "population",
                    data: ["1"],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

function checkChartAndCanvas() {
    if (!document.querySelector("#myChart")) {
        chartCtx = uiHTML.newDOMElement("canvas", {
            parent: document.body,
            id: "myChart",
        });
        myChart = initChart(chartCtx);
    }
    return { myChart, chartCtx };
}

export default { initChart, updateChart };
