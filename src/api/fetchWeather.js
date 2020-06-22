import axios from "axios";

const url = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "0c7a2039bb19621975716f6211316553";

export const fetchWeather = async (query) => {
  try {
    const { data } = await axios.get(url, {
      params: {
        q: query,
        units: "metric",
        appid: API_KEY,
      },
    });

    return data;
  } catch (err) {
    console.log(err);
  }
};
