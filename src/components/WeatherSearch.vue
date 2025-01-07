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
import { useWeatherStore } from "../stores/weather.js";
import { storeToRefs } from "pinia";

export default {
	data() {
		return {
			search: "",
		};
	},
	created() {
		// init weather store and map its state to component properties
		this.weatherStore = useWeatherStore();
		Object.assign(this, storeToRefs(this.weatherStore));
	},
	methods: {
		async getData() {
			// if search input is empty, set error state
			if (!this.search) {
				this.weatherStore.isError = true;
				return;
			}
			// reset error state and fetch weather data
			this.weatherStore.isError = null;
			await this.weatherStore.fetchWeatherData(this.search);
		},
	},
};
</script>

<style lang="less" scoped>
.weather-search {
	position: relative;
	.search-control {
		width: 100%;
		height: 50px;
		border: 2px solid fade(rgb(109, 109, 109), 10);
		border-radius: 100px;
		outline: none;
		background-color: transparent;
		font-size: 16px;
		padding-left: 25px;
		padding-right: 25px;
		transition: all 0.4s;
		color: white;
		&::placeholder {
			color: fade(rgb(255, 255, 255), 60);
		}
		&:focus {
			background-color: rgb(73, 67, 67);
			box-shadow: 0 8px 16px fade(black, 25);
			border-color: fade(black, 5);
			&::placeholder {
				font-weight: 400;
			}
		}
	}
	.error {
		position: absolute;
		color: red;
		text-align: center;
		bottom: -35px;
		left: 0;
		right: 0;
		margin: auto;
		font-size: 14px;
	}
	.country {
		position: absolute;
		top: 50%;
		right: 30px;
		transform: translateY(-50%);
		color: var(--grayColor);
	}
}
</style>
