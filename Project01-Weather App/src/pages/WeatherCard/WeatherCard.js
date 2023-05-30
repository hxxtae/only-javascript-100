import { weatherKinds } from "../../utils/icons.js";

export default function WeatherCard({
  $target,
  data,
  onAddCard,
  onVisibleList
}) {
  this.$element = document.createElement("section");
  this.$element.id = "weather-card";
  $target.appendChild(this.$element);

  this.state = {
    weatherCard: { ...data, add: false },
    active: false
  };

  this.setState = (newState) => {
    this.state = {
      ...this.state,
      ...newState
    };
    this.render();
  };

  this.$element.addEventListener("click", (e) => {
    const target = e.target.closest("button");
    if (!target) return;
    if (target.className === "add") {
      const add = this.state.weatherCard.add;
      const newdata = { ...this.state.weatherCard, add: !add };
      onAddCard(newdata, add);
    }
    if (target.className === "prev") {
      onVisibleList();
    }
  });

  this.render = () => {
    const { id, name, weather, main, wind, add } = this.state.weatherCard;
    const active = this.state.active;
    this.$element.innerHTML =
      active && id
        ? `
      <h1>${name}</h1>
      <div class="image">
        <img src=${weatherKinds(weather[0].main)} alt="clear" />
      </div>
      <h2 class="temperature">${Math.floor(main.temp)}ºC</h2>
      <strong class="temperatureTitle">${weather[0].main}</strong>
      <div class="other-datas">
        <div class="humidity">
          <i class="fa-solid fa-water fa-xl"></i>
          <div class="wrapper">
            <strong>${main.humidity}%</strong>
            <strong>Humidity</strong>
          </div>
        </div>
        <div class="windSpeed">
          <i class="fa-solid fa-wind fa-xl"></i>
          <div class="wrapper">
            <strong>${wind.speed}Km/h</strong>
            <strong>Wind Speed</strong>
          </div>
        </div>
      </div>
      <div class="controls">
        <button type="button" class="add">
          ${
            add
              ? `<i class="fa-solid fa-minus"></i>`
              : `<i class="fa-solid fa-plus"></i>`
          }
        </button>
        <button type="button" class="prev">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    `
        : "";
  };
  this.render();
}
