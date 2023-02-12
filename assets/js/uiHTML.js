function updateContinentsButtons(continents) {
    const continentsButtons = newElementsFromList(continents, {
        type: "a",
        classList: ["continent"],
    });
    const htmlContinentsDiv = newDOMElement("div", {
        parent: document.querySelector(".toponyms-container"),
        id: "continents",
    });
    htmlContinentsDiv.append(...continentsButtons);
}

function updateCountriesButtons(countries) {
    document.querySelector("#countries")?.remove();
    document.querySelector("#cities")?.remove();
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
            `<span class="name">${country[0]}</span> (<span class="year">${
                country[1][country[1].length - 1]["year"]
            }</span>)
            <div class="drop-down">
                ${country[1]
                    .sort()
                    .reduce(
                        (html, population) =>
                            html + `<a>${population["year"]}</a>`,
                        ""
                    )}
            </div>`
    );
    newDOMElement("div", {
        before: document.querySelector("#continents"),
        id: "countries",
    });
    document.querySelector("#countries").append(...countriesButtons);
}

function updateCitiesButtons(cities) {
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
            `<span class="name">${city[0]}</span> (<span class="year">${
                city[1][0]["year"]
            }</span>)
            <div class="drop-down">
                ${city[1]
                    .sort()
                    .reduce(
                        (html, population) =>
                            html + `<a>${population["year"]}</a>`,
                        ""
                    )}
            </div>`
    );
    if (document.querySelector("#cities")) {
        document.querySelector("#cities").innerHTML = "";
    } else {
        newDOMElement("div", {
            before: document.querySelector("#countries"),
            id: "cities",
        });
    }
    document.querySelector("#cities").append(...citiesButtons);
}

// =============================================
//
// spinner and progress bar
//
// =============================================

function showLoadingScreen() {
    const loadingScreen = newDOMElement("div", {
        parent: document.body,
        id: "loadingScreen",
    });
    showSpinner(loadingScreen);
    showProgressBar(loadingScreen);
}

function removeLoadingScreen() {
    document.querySelector("#loadingScreen").classList.add("hide");
    setTimeout(() => document.querySelector("#loadingScreen").remove(), 700);
}

function showSpinner(parent) {
    const spinner = newDOMElement("div", {
        parent: parent,
        id: "spinner",
    });
    spinner.innerText = "Loading data...";
}

function showProgressBar(parent) {
    newDOMElement("div", {
        parent: parent,
        id: "myProgress",
    });
    newDOMElement("div", {
        parent: parent,
        id: "myBar",
    });
}

function showLoadingErrorMessage(message) {
    document.querySelector("#spinner").innerText = message;
    spinner.style.color = "#cc2222";
}

// =============================================
//
// Utils
//
// =============================================

function newDOMElement(
    type,
    { parent = null, after = null, before = null, id = null, classList = [] }
) {
    const newEl = document.createElement(type);
    newEl.id = id;
    if (classList.length) newEl.className = classList.join(" ");
    if (after) after.after(newEl);
    if (before) before.before(newEl);
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

function selectElement(el) {
    Array.from(el.parentElement.children).forEach((el) =>
        el.classList.remove("selected")
    );
    el.classList.add("selected");
}

function generateColorFromString(string, opacity = 1) {
    // https://gist.github.com/0x263b/2bdd90886c2036a1ad5bcf06d6e6fb37
    let hash = 0;
    if (string.length === 0) return hash;
    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    let rgb = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 255;
        rgb[i] = value;
    }
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
}

export default {
    newDOMElement,
    newElementsFromList,
    updateCountriesButtons,
    updateContinentsButtons,
    updateCitiesButtons,
    clearElement,
    generateColorFromString,
    showLoadingScreen,
    removeLoadingScreen,
    showLoadingErrorMessage,
    selectElement,
};
