import React, { useState, useEffect } from "react";
import city_icon from "../city.png";
import temp_icon from "../temperature.png";
import weath_icon from "../weather-news.png";
import search_icon from "../seo.png";
import "./weather.css";

const Weather = () => {
    const API = {
        weatherKey: '778e7db788526e60bfaf9ba6784c60b0',
        weatherBase: "https://api.openweathermap.org/data/2.5/",
        countryBase: "https://restcountries.com/v3.1/all",
    };

    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState(null);
    const [countryInfo, setCountryInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (weather) {
            fetch(`${API.countryBase}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Failed to fetch country data');
                    }
                    return res.json();
                })
                .then((result) => {
                    const country = result.find(country => country.cca2 === weather.sys.country);
                    setCountryInfo(country);
                })
                .catch((error) => {
                    setError(error.message);
                });
        }
    }, [weather]);

    const searchPressed = () => {
        setLoading(true);
        setError(null);
        fetch(`${API.weatherBase}weather?q=${search}&units=metric&APPID=${API.weatherKey}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                return res.json();
            })
            .then((result) => {
                setWeather(result);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    return (
        <div className="cover">
            <div className="title">Weather App</div>
            <input
                type="text"
                name="location"
                placeholder="Search.."
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="search">
                <img src={search_icon} alt="search" onClick={searchPressed} />
            </div>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {weather && (
                <div className="innerbox">
                    <div className="box1">
                        <div className="box1-title">
                            <img src={city_icon} alt="city" />
                            <div className="innerbox-title">{weather.name}</div>
                        </div>
                        <div className="about">
                            <div className="about-title">About</div>
                            {countryInfo && <p>{countryInfo.name.common}</p>}
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus necessitatibus doloribus quod. Quo praesentium illo magni commodi, repellat delectus consequuntur obcaecati perspiciatis animi. Deserunt, modi necessitatibus.</p>
                        </div>
                    </div>
                    <div className="box1">
                        <div className="box1-title">
                            <img src={temp_icon} alt="temperature" />
                            <div className="innerbox-title">Temperature</div>
                        </div>
                        <div className="about">
                            <div className="about-title"></div>
                            <p>{weather.main.temp}</p>
                        </div>
                    </div>
                    <div className="box1">
                        <div className="box1-title">
                            <img src={weath_icon} alt="weather" />
                            <div className="innerbox-title">Weather Conditions</div>
                        </div>
                        <div className="about">
                            <div className="about-title"></div>
                            <p>{weather.weather[0].main}</p>
                            <p>({weather.weather[0].description})</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
