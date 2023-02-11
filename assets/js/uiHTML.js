function updateContinentsButtons(continents) {
    const continentsButtons = newElementsFromList(continents, {
        type: "a",
        classList: ["continent"],
    });
    const htmlContinentsDiv = newDOMElement("div", {
        parent: document.body,
        id: "continents",
    });
    htmlContinentsDiv.append(...continentsButtons);
}

function updateCountriesButtons(countries) {
    document.querySelector("#countries")?.remove();
    const countriesButtons = newElementsFromList(
        countries,
        {
            type: "a",
            classList: ["country"],
            datasetCallback: (country) => ({
                "data-name": country[0],
                "data-year": country[1][country[1].length - 1]["year"],
            }),
        },
        (country) =>
            `${country[0]} (<span>${
                country[1][country[1].length - 1]["year"]
            }</span>)
            <div class="drop-down">
                ${country[1].reduce(
                    (html, population) => html + `<a>${population["year"]}</a>`,
                    ""
                )}
            </div>`
    );
    newDOMElement("div", {
        after: document.querySelector("#continents"),
        id: "countries",
    });
    document.querySelector("#countries").append(...countriesButtons);
}

function updateCitiesButtons(cities) {
    document.querySelector("#cities")?.remove();
    const citiesButtons = newElementsFromList(
        cities,
        {
            type: "a",
            classList: ["city"],
            datasetCallback: (city) => ({
                "data-name": city[0],
                "data-year": city[1][0]["year"],
            }),
        },
        (city) =>
            `${city[0]} (<span>${city[1][0]["year"]}</span>)
            <div class="drop-down">
                ${city[1].reduce(
                    (html, population) => html + `<a>${population["year"]}</a>`,
                    ""
                )}
            </div>`
    );
    if (document.querySelector("#cities")) {
        document.querySelector("#cities").innerHTML = "";
    } else {
        newDOMElement("div", {
            after: document.querySelector("#countries"),
            id: "cities",
        });
    }
    document.querySelector("#cities").append(...citiesButtons);
}

// =============================================
//
// Utils
//
// =============================================

function newDOMElement(
    type,
    { parent = null, after = null, id = null, classList = [] }
) {
    const newEl = document.createElement(type);
    newEl.id = id;
    newEl.className = classList.join(" ");
    if (after) after.after(newEl);
    else parent?.appendChild(newEl);
    return newEl;
}

function newElementsFromList(
    dataList,
    { type = "div", classList = [], datasetCallback = null },
    innerHTMLcallback = null
) {
    return dataList.map((data) => {
        const htmlElement = document.createElement(type);
        htmlElement.className = classList.join(" ");
        if (datasetCallback)
            Object.entries(datasetCallback(data)).forEach(([key, value]) => {
                htmlElement.setAttribute(key, value);
            });
        htmlElement.innerHTML = innerHTMLcallback
            ? innerHTMLcallback(data)
            : data;
        return htmlElement;
    });
}

function clearElement(element) {
    if (element) element.innerHTML = "";
}

export default {
    newDOMElement,
    newElementsFromList,
    updateCountriesButtons,
    updateContinentsButtons,
    updateCitiesButtons,
    clearElement,
};
