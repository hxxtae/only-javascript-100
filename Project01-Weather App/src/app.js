import { fetchWeather } from "./apis/api.js";
import { WeatherSearch } from "./pages/WeatherSearch/index.js";
import { WeatherList } from "./pages/WeatherList/index.js";
import { WeatherCard } from "./pages/WeatherCard/index.js";

export default function App({ $target, $portal }) {
  /* 
    data: 날씨 데이터
    datas: 날씨 데이터 배열
    active: 날씨 Card on/off
    visible: 날씨 List on/off
  */
  this.state = {
    data: null,
    datas: [],
    active: false,
    visible: false
  };

  this.setState = (newState) => {
    this.state = {
      ...this.state,
      ...newState
    };
    weatherCard.setState({
      weatherCard: { ...this.state.data },
      active: this.state.active
    });
    weatherList.setState({
      weatherList: [...this.state.datas],
      visible: this.state.visible
    });
  };

  // 날씨 검색
  this.onSearch = async (city) => {
    const weather = await fetchWeather(city);
    if (!weather) return;
    const datas = this.state.datas;
    const add = datas.find((item) => item.id === weather.id)?.add;
    this.setState({
      data: { ...weather, add: !!add },
      active: true,
      visible: false
    });
    $portal.setAttribute("hidden", "hidden");
  };

  // 검색한 도시 및 나라 날씨 목록에 저장
  this.onAddCard = (newData, add) => {
    let newDatas = [...this.state.datas];
    if (add) newDatas = newDatas.filter((item) => item.id !== newData.id);
    else newDatas.push(newData);
    this.setState({
      data: newData,
      datas: newDatas
    });
  };

  // 저장한 날씨 목록 보기
  this.onVisibleList = () => {
    this.setState({
      active: false,
      visible: true
    });
    if (this.state.datas.length) {
      $portal.removeAttribute("hidden");
    }
  };

  // 저정한 날씨 목록 선택
  this.onClickList = (clickData) => {
    this.setState({
      data: clickData,
      active: true,
      visible: false
    });
    $portal.setAttribute("hidden", "hidden");
  };

  new WeatherSearch({ $target, onSearch: this.onSearch });

  const weatherCard = new WeatherCard({
    $target,
    data: { ...this.state.data },
    onAddCard: this.onAddCard,
    onVisibleList: this.onVisibleList
  });

  const weatherList = new WeatherList({
    $portal,
    datas: [...this.state.datas],
    onClickList: this.onClickList
  });
}
