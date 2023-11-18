import {  createCountry ,createCountryByCode, startPreviewCountries} from "./countryFunction.js";

export const declareEvents = () => {
    let id_form = document.querySelector("#id_form");
    let select_box = document.querySelector("#id_select_country");
    let input_search = document.querySelector("#searchBar");
    let Israel = document.querySelector("#id_israel");
    let USA = document.querySelector("#id_USA");
    let France = document.querySelector("#id_France");
    let UK = document.querySelector("#id_UK");
    let Thailand = document.querySelector("#id_thailand");
    let parent = document.querySelector("#id_row");
    let id_home = document.querySelector("#id_home");
  
    Israel.addEventListener("click", () => {
        parent.innerHTML = "";
        createCountryByCode("isr");
    })
    USA.addEventListener("click", () => {
        parent.innerHTML = "";
        createCountryByCode("USA");
    })
    France.addEventListener("click", () => {
        parent.innerHTML = "";
        createCountryByCode("fra");
    })
    UK.addEventListener("click", () => {
        parent.innerHTML = "";
        createCountryByCode("gbr");
    })
    Thailand.addEventListener("click", () => {
        parent.innerHTML = "";
        createCountryByCode("tha");
    })

    id_home.addEventListener("click", () => {
        parent.innerHTML = "";
        startPreviewCountries();
    })

    id_form.addEventListener("submit", e => {
        e.preventDefault()
        const searchTerm = input_search.value;

        createCountry(input_search.value);
        if (!select_box.querySelector(`option[value="${searchTerm}"]`)) {
            let option = document.createElement("option");
            option.value = searchTerm;
            option.text = searchTerm;
            select_box.add(option);
        }

        select_box.value = searchTerm;
    })

    select_box.addEventListener("change", () => {
        if (select_box.value !== "0") {
            parent.innerHTML = "";
            createCountry(select_box.value);
            input_search.value = select_box.value;
        }
    });
};



export const fillSelectBox = () => {
    let selectBox = document.querySelector("#id_select_country");
    sortAlphabet();
    selectBox.innerHTML = "";
    let defaultOption = document.createElement("option");
    defaultOption.value = "0";
    defaultOption.text = "Choose a country";
    selectBox.append(defaultOption);
    countries_arr.forEach((item) => {
        let option = document.createElement("option");
        option.value = item.name.common;
        option.text = item.name.common;
        selectBox.append(option);
    });
};

