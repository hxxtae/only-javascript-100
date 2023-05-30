export default function WeatherList({ $portal, datas, onClickList }) {
  this.$element = document.createElement("ul");
  this.$element.id = "weather-context";
  $portal.appendChild(this.$element);

  this.state = {
    weatherList: [...datas],
    visible: false
  };

  this.setState = (newState) => {
    this.state = {
      ...this.state,
      ...newState
    };
    this.render();
  };

  this.$element.addEventListener(
    "click",
    (e) => {
      // 캡처링 true
      const $li = e.target.closest("li");
      if (!$li) return;
      const clickId = $li.getAttribute("key");
      const clickData = this.state.weatherList.find(
        (data) => data.id === +clickId
      );
      onClickList(clickData);
    },
    true
  );

  this.render = () => {
    const { weatherList, visible } = this.state;
    if (!visible || !weatherList.length) {
      this.$element.innerHTML = "";
      return;
    }
    this.$element.innerHTML = `
      ${weatherList
        ?.map(
          (item) => `
        <li key=${item.id}>
          <div class="wrapper-top">
            <div class="left">
              <strong>${item.name}</strong>
              <span>${item.coord.lon} / ${item.coord.lat}</span>
            </div>
            <p class="right">
              ${Math.floor(item.main.temp)}ºC
            </p>
          </div>
          <div class="wrapper-bottom">
            <span>최고:${Math.floor(item.main.temp_max)}ºC</span>
            <span>최저:${Math.floor(item.main.temp_min)}ºC</span>
          </div>
        </li>
      `
        )
        .join("")}
    `;
  };
}
