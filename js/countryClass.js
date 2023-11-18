import { convertShortToReal, createCountryByCode, getNameByCode, createCountry, startClass, classCard } from "./countryFunction.js";
import { init } from "./app.js";

export default class Country {
  constructor(_parent, _item, _getNameByCode, _createCountryByCode) {
    this.parent = _parent;
    this.name = _item.name.common;
    this.pop = Number(_item.population).toLocaleString();
    this.capital = _item.capital;
    this.flag = _item.flags.png;
    this.languages = _item.languages ? Object.values(_item.languages).join() : "none";
    this.coin = _item.currencies;
    this.coinDescription = Object.keys(_item.currencies)[0].symbol;
    this.region = _item.region;
    this.map = _item.latlng;
    this.countryCode = _item.cca3;
    this.borders = _item.borders;
    this.getNameByCode = _getNameByCode;
    this.createCountryByCode = _createCountryByCode;
  }
  renderCoin = (currencies) => {
    return Object.entries(currencies)
      .map(([code, currency]) => `${currency.name} ${currency.symbol}`)
      .join(', ');
  }


  render() {
    let div = document.createElement("div");
    div.className = "rounded border bg-dark bg-opacity-75  text-white   p-4 col-lg-5 col-md-8 col-sm-9  m-2";
    div.setAttribute("data-aos", "fade-up");
    div.setAttribute("data-aos-duration", "1500");
    document.querySelector(this.parent).append(div);

    div.innerHTML =
      ` <img src="${this.flag}" alt="${this.name}" class=" col-6 float-end mx-3 mb-2">
        <h3></strong>${this.name}</strong></h3>
        <div><strong>Population:</strong> ${this.pop} </div>
        <div><strong>Region:</strong> ${this.region}</div>
        <div><strong>Languages:</strong> ${this.languages}</div>
        <div><strong>Coin:</strong>  ${this.renderCoin(this.coin)}</div>
        <div><strong>Capital:</strong> ${this.capital}</div>
        <div class="mt-3 " id="id_border"><strong>States with borders:</strong><br>
        <div id="id_borders" class="borders_div"></div>
        </div>
        </div>
        <iframe class="mt-3 col-12 pe-3" height="300" src="https://maps.google.com/maps?q=${this.map[0]},${this.map[1]}&z=7&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ></iframe>
   `;
    if (this.borders) {
      this.borders.forEach(async (item, index) => {
        if (item !== "PSE") {
          let fullName = await this.getNameByCode(item);
          let span = document.createElement("span");
          span.innerHTML = `${fullName}${index < this.borders.length - 1 ? ',' : '.'} `;
          document.querySelector("#id_borders").append(span);

          span.addEventListener("click", () => {
            this.createCountryByCode(item);
          });
          span.addEventListener("mouseover", () => {
            span.classList.add("hovered");
          });

          span.addEventListener("mouseout", () => {
            span.classList.remove("hovered");
          });
        }
      });

    } else {

      document.querySelector("#id_border").innerHTML = "The country does not border with other countries";
    }


  }
  renderInitial = () => {
    let div = document.createElement("div");
    div.className = "col-4 px-3 mt-4 text-center box  ";
    document.querySelector(this.parent).append(div);
    let img = document.createElement("img");
    img.src = this.flag;
    img.alt = this.name;
    img.className="col-10 "
    img.addEventListener("click", () => {
      document.querySelector("#id_row").innerHTML = "";
      classCard();
      this.render();
    });
    div.append(img);
    let h2 = document.createElement("h2");
    h2.textContent = this.name;
    h2.className = "my-3"
    h2.style.fontWeight = "700";
    div.append(h2);
  }

}