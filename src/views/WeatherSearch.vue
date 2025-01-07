<template>
	<div>
		<div class="weather-search">
			<input
				type="text"
				placeholder="Search City"
				class="search-control"
				v-model.trim="search"
				@keyup.enter="getData"
			/>
			<span class="country" v-if="isSearched"
				>({{ getWeatherCountry }})</span
			>
			<div class="error" v-if="getError">
				No results found! fix it try again.
			</div>
		</div>
	</div>
</template>

<script>
import useWeatherStore from "./stores/weather.js";

export default {
	data() {
		return {
			search: "",
			isSearched: false,
		};
	},
	computed: {
		getWeatherCountry() {
			const store = useWeatherStore();
			return store.weatherData?.country || "";
		},
		getError() {
			const store = useWeatherStore();
			return store.error;
		},
	},
	methods: {
		async getData() {
			const store = useWeatherStore();
			this.isSearched = true;
			await store.fetchWeather(this.search);
		},
	},
};
</script>
