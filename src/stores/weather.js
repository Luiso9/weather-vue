import { defineStore } from "pinia";
import axios from "axios";

export const useWeatherStore = defineStore("weather", {
    state: () => ({
        apiBase: "https://api.openweathermap.org/data/2.5/",
        apiKey: "TOKEN_HERE_FUCK",
        defaultSearch: "Jakarta",
        search: "",
        isError: null,
        weatherData: {},
    }),
    getters: {
        getWeatherMain: (state) => {
            const { temp, feelsLike, description, icon, info } = state.weatherData;
            return { temp, feelsLike, description, info, icon };
        },
        getWeatherInfo: (state) => {
            const { wind, clouds, humidity } = state.weatherData;
            return { wind, clouds, humidity };
        },
        getWeatherCountry: (state) => state.weatherData.country,
        isSearched: (state) => state.isError,
        getError: (state) => state.isError,
    },
    actions: {
        async fetchWeatherData(search) {
            if (!search) {
                this.isError = true;
                this.weatherData = {};
                return;
            }
            this.search = search;
            this.isError = null;
            try {
                // api call fetch weather data
                const response = await axios.get(
                    `${this.apiBase}/weather`, {
                    params: {
                        q: search,
                        units: "metric",
                        APPID: this.apiKey
                    }
                });
                const { name, main, weather, wind, clouds, sys } = response.data;
                // update weatherData state with the response data
                this.weatherData = {
                    name,
                    temp: main.temp,
                    tempMin: main.temp_min,
                    tempMax: main.temp_max,
                    feelsLike: main.feels_like,
                    description: weather[0].description,
                    icon: weather[0].icon.substring(0, 2),
                    info: weather[0].main,
                    wind: wind.speed,
                    humidity: main.humidity,
                    clouds: clouds.all,
                    country: sys.country,
                };
                this.isError = false;
            } catch (error) {
                console.error(error);
                this.isError = true;
                this.weatherData = {};
            }
        }
    }
});
