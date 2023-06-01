const COMMON_URL =
  "http://api.openweathermap.org/data/2.5/weather?units=metric&appid=";
const API_KEY = '8b282864575b2fb1c1b0c938ad6e6bd1';

const response = async (url) => {
  try {
    const res = await fetch(url);
    // 4xx Client Error
    if (!res.ok) return alert(`${res.status}/${res.statusText}`);
    // 2xx Ok
    return res.json();
  } catch (e) {
    // 5xx Server Error
    alert(e.message);
    console.error(`Weather-Fetch Error: ${e.message}`);
  }
};

export const fetchWeather = (city, lang = "kr") =>
  response(`${COMMON_URL}${API_KEY}&q=${city}&land=${lang}`);
