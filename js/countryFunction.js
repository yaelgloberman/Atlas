import { countries_arr, nav_countries_arr } from "./app.js";
import Country from "./countryClass.js";

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

export const createCountryByCode = (_input) => {
    document.querySelector("#id_row").innerHTML = "";
   classCard();
    let arr = countries_arr.filter((item) =>
        item.cca3.toLowerCase().includes(_input.toLowerCase())
    );
    if (_input === "" || _input === " ") {
        alert("empty");
    } else if (arr.length > 0) {
        arr.forEach((item) => {
            let country = new Country("#id_row", item, getNameByCode, createCountryByCode);
            classCard();
            country.render();
        });
    } else {
        errorClass();
        document.querySelector("#id_row").innerHTML = `<h4 class="display-4">The country ${_input} is  not found </h4>`;
    }
};

export const getNameByCode = async (code) => {
    let url = `https://restcountries.com/v3.1/alpha/${code}`;
    let resp = await fetch(url);
    let data = await resp.json();
    return data[0].name.common;
}


export const createCountry = (_input) => {

    document.querySelector("#id_row").innerHTML = "";

    let arr = countries_arr.filter((item) =>
        item.name.common.toLowerCase().includes(_input.toLowerCase())
    );
    if (arr.length > 0) {
        arr.forEach((item) => {
            let country = new Country("#id_row", item, getNameByCode, createCountryByCode);
            classCard();
            country.render();
        });
    } 
    else {
        errorClass();
        document.querySelector("#id_row").innerHTML = `<h4 class="display-4">The country ${_input} is  not found </h4>`;
    }
    if (arr[0] != null) { return arr[0].name.common }
};


export const convertShortToReal = async (codeCountry) => {
    let url = `https://restcountries.com/v3.1/alpha/${codeCountry}`;
    let resp = await fetch(url);
    let data = await resp.json();
    let fullCountry = await (data[0].name.common);
    return fullCountry;
}


export const startPreviewCountries = () => {    
    startClass();
    let div = document.createElement("div");

    div.className = "text-center";
    document.querySelector("#id_row").append(div);
    div.innerHTML = `
    <h1 class="explore mt-4 mb-3">Explore Countries</h1>
    <p class="mb-4" class="ms-1">Discover information about countries, population, regions etc.</p>    `
    let tmp = countries_arr.filter((item) =>
        nav_countries_arr.includes(item.name.common.toLowerCase())
    );

    tmp.forEach((item) => {
        let country = new Country("#id_row", item, convertShortToReal, createCountryByCode);
        country.renderInitial();
    });
};

const sortAlphabet = () => {
    countries_arr.sort((a, b) => a.name.common.localeCompare(b.name.common));
};

export const startClass = ()=> {
    let main = document.querySelector("#id_main");
    main.className="container pt-4  justify-content-around d-flex";
    let row = document.querySelector("#id_row");
    row.className="row col-lg-8  col-md-9 col-sm-9 justify-content-center";
}

export const classCard = ()=> {
    let main = document.querySelector("#id_main");
    main.className="container pt-4 ";
    let row = document.querySelector("#id_row");
    row.className="row justify-content-center ";
}
export const errorClass = ()=> {
    let main = document.querySelector("#id_main");
    main.className="container pt-4  justify-content-around  d-flex ";
    let row = document.querySelector("#id_row");
    row.className="row col-7 justify-content-center ";
}