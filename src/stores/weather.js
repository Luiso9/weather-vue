import { defineStore } from "pinia";
import axios from "axios";

export const useWeatherStore = defineStore("weather", {
    state: () => ({
        apiBase: "api",
        apiKey: "apikey",
        defaultSearch: "Jakarta",
        search: "",
        isError: null,
        weatherData: {},
    }),
    getters: {
        getWeatherMain: (state) => {
            const { temp, feelsLike, description, icon, info } = state.weatherData;
            return {
                temp,
                feelsLike,
                description,
                info,
                icon,
            };
        },
        getWeatherInfo: (state) => {
            const { wind, clouds, humidity } = state.weatherData;
            return {
                wind,
                clouds,
                humidity,
            };
        },
        getWeatherCountry: (state) => state.weatherData.country,
        isSearched: (state) => state.isError,
        getError: (state) => state.isError,
    },
    actions: {
        async fetchWeatherData(search) {
            try {
                this.search = search;
                const response = await axios.get(
                    `${this.apiBase}weather?q=${search}&units=metric&APPID=${this.apiKey}`
                );
                const newWeatherData = {
                    name: response.data.name,
                    temp: response.data.main.temp,
                    tempMin: response.data.main.temp_min,
                    tempMax: response.data.main.temp_max,
                    feelsLike: response.data.main.feels_like,
                    description: response.data.weather[0].description,
                    icon: response.data.weather[0].icon.substring(0, 2),
                    info: response.data.weather[0].main,
                    wind: response.data.wind.speed,
                    humidity: response.data.main.humidity,
                    clouds: response.data.clouds.all,
                    country: response.data.sys.country,
                };
                this.weatherData = newWeatherData;
                this.isError = false;
            } catch (error) {
                console.log(error);
                this.isError = true;
                this.weatherData = {};
            }
        }
    }
});
