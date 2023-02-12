import dataManager from "./dataManager.js";
import uiHTML from "./uiHTML.js";

// https://simplemaps.com/docs/

function createMap() {
    uiHTML.newDOMElement("div", {
        id: "map",
        after: document.querySelector("#continents"),
    });
    globalThis.simplemaps_worldmap.create().load();
}

function initMapInfo() {
    const continents = dataManager.getContinents();
    const countries = dataManager.getCountriesWithCodes();

    globalThis.simplemaps_worldmap_mapdata = {
        main_settings: {
            //General settings
            width: "responsive", //'700' or 'responsive'
            background_color: "#FFFFFF",
            background_transparent: "yes",
            border_color: "#ffffff",
            popups: "detect",

            //State defaults
            state_description: "State description",
            state_color: "#88A4BC",
            state_hover_color: "#3B729F",
            state_url: "",
            border_size: 1.5,
            all_states_inactive: "no",
            all_states_zoomable: "yes",

            //Location defaults
            location_description: "Location description",
            location_color: "#FF0067",
            location_opacity: 0.8,
            location_hover_opacity: 1,
            location_url: "",
            location_size: 25,
            location_type: "square",
            location_image_source: "frog.png",
            location_border_color: "#FFFFFF",
            location_border: 2,
            location_hover_border: 2.5,
            all_locations_inactive: "no",
            all_locations_hidden: "no",

            //Label defaults
            label_color: "#d5ddec",
            label_hover_color: "#d5ddec",
            label_size: 22,
            label_font: "Arial",
            hide_labels: "no",

            //Zoom settings
            zoom: "yes",
            back_image: "no",
            initial_back: "no",
            initial_zoom: -1,
            initial_zoom_solo: "no",
            region_opacity: 1,
            region_hover_opacity: 0.6,
            zoom_out_incrementally: "yes",
            zoom_percentage: 0.99,
            zoom_time: 0.5,

            //Popup settings
            popup_color: "white",
            popup_opacity: 0.9,
            popup_shadow: 1,
            popup_corners: 5,
            popup_font: "12px/1.5 Verdana, Arial, Helvetica, sans-serif",
            popup_nocss: "no",

            //Advanced settings
            div: "map",
            auto_load: "yes",
            url_new_tab: "yes",
            images_directory: "default",
            fade_time: 0.1,
            link_text: "",
            state_image_url: "",
            state_image_position: "",
            location_image_url: "",
            manual_zoom: "yes",
        },
        state_specific: countries.reduce(
            (obj, country) => ({
                ...obj,
                [country[1]]: {
                    name: country[0],
                    description: "",
                    url: "",
                    color: uiHTML.generateColorFromString(country[0], 1),
                },
            }),
            {}
        ),
        locations: {},
        labels: {},
        legend: {
            entries: [
                {
                    name: "population map",
                    color: "#cecece",
                    type: "location",
                    shape: "circle",
                    ids: "23",
                },
            ],
        },
        regions: continents.reduce(
            (obj, continent, idx) => ({
                ...obj,
                [idx]: {
                    states: countries.filter(
                        (country) => country[2] === continent
                    ),
                    name: continent,
                },
            }),
            {}
        ),
    };
}
export default { initMapInfo, createMap };
