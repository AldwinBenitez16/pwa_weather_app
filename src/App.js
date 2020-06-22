import React, { Component } from "react";

import { fetchWeather } from "./api/fetchWeather";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      weather: {},
    };

    this.onSearchWeather = this.onSearchWeather.bind(this);
    this.changeSearchQuery = this.changeSearchQuery.bind(this);
  }

  async onSearchWeather(e) {
    const { searchQuery } = this.state;
    if (e.key === "Enter") {
      const data = await fetchWeather(searchQuery);
      this.setState({
        weather: data,
        searchQuery: "",
      });
    }
  }

  changeSearchQuery(search) {
    this.setState({
      searchQuery: search,
    });
  }

  render() {
    const { searchQuery, weather } = this.state;
    const { changeSearchQuery, onSearchWeather } = this;
    return (
      <div className="main-container">
        <input
          type="text"
          className="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => changeSearchQuery(e.target.value)}
          onKeyPress={onSearchWeather}
        />
        {weather.main && (
          <div className="city">
            <h2 className="city-name">
              <span>{weather.name}</span>
              <sup>{weather.sys.country}</sup>
            </h2>
            <div className="city-temp">
              {Math.round(weather.main.temp)}
              <sup>&deg;C</sup>
            </div>
            <div className="info">
              <img
                className="city-icon"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <p>{weather.weather[0].description}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
