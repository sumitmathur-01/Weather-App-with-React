import React, { useState } from "react";
import "./Weather.css"
const api = {
    key: "3a6a3b9ff0f4395cbea6a0d82d0d3f21",
    base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState({});

    const search = async (evt) => {
        if (evt.key === "Enter") {
            const response = await fetch(
                `${api.base}weather?q=${city}&appid=${api.key}&units=metric`
            );
            const result = await response.json();

            setWeather(result);
            setCity("");

            console.log(result);
        }
    };

    const dateBuilder = (d) => {
        let months = [
            "January",
            "February",
            "March",
            " April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        let days = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    };

    return (
        <div className={(typeof weather.main !== "undefined") ? ((weather.main.temp > 16) ? 'app warm' : (weather.main.humidity > 80 ? 'app rain' : 'app cold')) : 'app'}>
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyPress={search}
                    />
                    <i className="ri-search-line"></i>
                </div>

                {weather.name && weather.sys && (
                    <div className="location-box">
                        <div className="location">
                            {weather.name}, {weather.sys.country}
                        </div>
                        <div className="date">{dateBuilder(new Date())}</div>
                    </div>
                )}

                {weather.main && (
                    <div className="weather-box">
                        <div className="temp">
                            {Math.round(weather.main.temp)}&deg;C
                        </div>
                        <div className="weather">{weather.weather[0].main}</div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Weather;
