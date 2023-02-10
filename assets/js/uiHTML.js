function newElementsFromList(names, { elementType = "a", classList = [] }) {
    return names.map((name) => {
        const htmlElement = document.createElement(elementType);
        if (elementType === "a") htmlElement.href = "#";
        classList.forEach((className) => htmlElement.classList.add(className));
        htmlElement.innerText = name;
        return htmlElement;
    });
}

export default { newElementsFromList };
