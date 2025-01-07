<template>
	<div v-if="!isError">
		<h1>Weather in {{ weatherData.name }}</h1>
		<p>Temperature: {{ weatherMain.temp }}°C</p>
		<p>Feels Like: {{ weatherMain.feelsLike }}°C</p>
		<p>Description: {{ weatherMain.description }}</p>
		<p>Wind Speed: {{ weatherInfo.wind }} m/s</p>
		<p>Clouds: {{ weatherInfo.clouds }}%</p>
		<p>Humidity: {{ weatherInfo.humidity }}%</p>
		<p>Country: {{ weatherCountry }}</p>
	</div>
	<div v-else>
		<p>Error fetching weather data. Please try again.</p>
	</div>
</template>

<script>
import { useWeatherStore } from "@/stores/weather";
import { mapState } from "pinia";

export default {
	name: "WeatherInfo",
	computed: {
		// map state from weather store to local computed properties
		...mapState(useWeatherStore, [
			"weatherData",
			"isError",
			"getWeatherMain",
			"getWeatherInfo",
			"getWeatherCountry",
		]),
		weatherMain() {
			return this.getWeatherMain;
		},
		// get additional weather information
		weatherInfo() {
			return this.getWeatherInfo;
		},
		// get country weather data
		weatherCountry() {
			return this.getWeatherCountry;
		},
	},
	created() {
		// fetch weather data when the component is created
		const weatherStore = useWeatherStore();
		weatherStore.fetchWeatherData(weatherStore.defaultSearch);
	},
};
</script>

<style lang="less" scoped>
.weather-info {
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-top: 2px solid fade(black, 10);
	padding-top: 20px;
	.weather-item {
		display: flex;
		align-items: center;
		color: var(--darkColor);
		.value {
			margin-left: 5px;
			font-weight: 500;
		}
	}
}
</style>
