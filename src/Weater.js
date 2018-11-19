import fetchApi from "./api";

class WeaterMainClass {
  constructor() {
    this.citys = [];
    this._weatherApiURL = "http://api.openweathermap.org/data/2.5/weather";
    this._weatherSecretKey = "c27f319f60d4a6082637084e20d91315";
    this.config = {
      selector: "body"
    };
    this.citysData = [];
  }
  async init(citys, config) {
    if (typeof citys === "object" && citys.length > 0 && citys !== null) {
      this.citys = citys;
    } else {
      throw new Error("Data it's wrong");
    }
    if (
      config !== undefined &&
      typeof config === "object" &&
      Object.keys(config).length > 0
    ) {
      this.config = { ...this.config, config };
    }
    this.citysData = await fetchApi(this.citys);
    this.painting();
    return true;
  }
  convertCelsiusToFahrenheit(celsius) {
    let num = (celsius * 9) / 5 + 32;

    return num.toFixed(2);
  }

  makeHtmlElemnts(data) {
    return `<span class="weather-app-info-body-title">${
      data.main.humidity
    }</span>
    <span class="weather-app-info-body-title">${data.main.pressure}</span>
    <span class="weather-app-info-body-title weather-app-temp" data-celsius="${data.main.temp}" 
    data-fahrenheit="${this.convertCelsiusToFahrenheit(data.main.temp)}">${data.main.temp} C</span>
    <span class="weather-app-info-body-title weather-app-temp"data-celsius="${data.main.temp_max}" 
    data-fahrenheit="${this.convertCelsiusToFahrenheit(data.main.temp_max)}">${data.main.temp_max} C</span>
    <span class="weather-app-info-body-title weather-app-temp" data-celsius="${data.main.temp_min}" 
    data-fahrenheit="${this.convertCelsiusToFahrenheit(data.main.temp_min)}">${data.main.temp_min} C</span>
    <span class="weather-app-info-body-title">${data.wind.speed}</span>`;
  }
  makeHtml(name, id, elemnts) {
    return `<div class="weather-app" data-id="${id}">
      <div class="toggle-switch">
        <span class="toggle-switch-text">C</span>
        <label class="switch">
          <input type="checkbox" /> <span class="slider round"></span>
        </label>
        <span class="toggle-switch-text">F</span>
      </div>
      <div class="weather-app-arguments">
        <h3 class="title">${name}</h3>
        <p>Weather info</p>
      </div>
      <div class="weather-app-info">
        <div class="weather-app-header weather-app-section">
          <span class="weather-app-info-heder-title">Humidity</span>
          <span class="weather-app-info-heder-title">Pressure</span>
          <span class="weather-app-info-heder-title">Temp</span>
          <span class="weather-app-info-heder-title">Temp Max</span>
          <span class="weather-app-info-heder-title">Temp Min</span>
          <span class="weather-app-info-heder-title">Winds</span>
        </div>
        <div class="weather-app-body weather-app-section">
          ${elemnts}
        </div>
      </div>
    </div>`;
  }
  painting() {
    let container = document.querySelector(this.config.selector);

    container.innerHTML = "";
    this.citysData.forEach(item => {
      container.innerHTML += this.makeHtml(
        item.name,
        item.id,
        this.makeHtmlElemnts(item)
      );
    });
    this.eventListner();
  }
  eventListner() {
    document
      .querySelectorAll(`${this.config.selector} input`)
      .forEach(checkbox => {
        checkbox.addEventListener("change", e => {
          e.target
            .closest(".weather-app")
            .querySelectorAll(".weather-app-temp")
            .forEach(temp => {
              if (e.target.checked) {
                temp.textContent = temp.getAttribute("data-fahrenheit") + " F";
              } else {
                temp.textContent = temp.getAttribute("data-celsius") + " C";
              }
            });
        });
      });
  }
}

let weather = new WeaterMainClass();

export default weather;
