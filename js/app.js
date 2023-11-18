import Country from "./countryClass.js";
import { fillSelectBox , startPreviewCountries} from "./countryFunction.js";
import { declareEvents } from "./events.js";

export let countries_arr = [];
export let nav_countries_arr = ["united states", "france","israel", "united kingdom", "thailand"];


export const init = () => {
  console.log("im in init");
  doApi();
  declareEvents();
};

export const doApi = async () => {
  let url = "https://restcountries.com/v3.1/all";
  let resp = await fetch(url);
  let data = await resp.json();
  countries_arr = data;
  fillSelectBox();
  startPreviewCountries();
};




init();








