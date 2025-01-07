<template>
	<div class="weather-main">
		<div class="weather-feelsLike">
			Feels like
			<strong>
				{{ roundedFeelsLike }}
				<sup>&deg;</sup>
			</strong>
		</div>
		<div class="weather-temp">
			<div
				class="weather-icon"
				:style="[
					weatherStore.getWeatherMain.icon
						? {
								'background-image':
									'url(http://openweathermap.org/img/wn/' +
									weatherStore.getWeatherMain.icon +
									'd@2x.png)',
						  }
						: {},
				]"
			></div>
			<span>{{ roundedTemp }}</span>
			<sup>&deg;</sup>
		</div>
		<div class="weather-description">{{ weatherStore.getWeatherMain.description }}</div>
		<p></p>
	</div>
</template>

<script>
import { useWeatherStore } from "@/stores/weather";
import { mapStores } from "pinia";

export default {
	setup() {
		const weatherStore = useWeatherStore();
		return {
			weatherStore,
		};
	},
	computed: {
		// map the store's state to computed properties
		...mapStores(useWeatherStore, ["getWeatherMain"]),
		// compute the rounded value temperature
		roundedFeelsLike() {
			return Math.round(this.weatherStore.getWeatherMain.feelsLike);
		},
		// compute the rounded value main temperature
		roundedTemp() {
			return Math.round(this.weatherStore.getWeatherMain.temp);
		},
	},
};
</script>

<style lang="less" scoped>
.weather {
	&-main {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		margin-top: 40px;
		margin-bottom: 40px;
		.weather {
			&-temp {
				position: relative;
				width: 150px;
				height: 150px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 100%;
				box-shadow: 0 0 40px fade(rgb(228, 209, 209), 20);
				background-color: rgba(247, 74, 74, 0.863);
				margin: 40px 0;
				span {
					font-size: 80px;
					font-weight: 800;
					letter-spacing: -2px;
					position: relative;
				}
				sup {
					position: relative;
					top: -21px;
					font-size: 40px;
				}
			}
			&-icon {
				position: absolute;
				top: -35px;
				left: -35px;
				width: 110px;
				height: 110px;
				background-repeat: no-repeat;
				background-size: 100%;
				filter: drop-shadow(1px 1px 0 fade(black, 3))
					drop-shadow(-5px -5px 0 fade(black, 8));
			}
			&-feelsLike,
			&-description {
				font-size: 18px;
				color: var(--darkColor);
				text-transform: capitalize;
				sup {
					position: relative;
					top: 5px;
					left: -2px;
					font-size: 18px;
				}
			}
		}
	}
}

@media (max-height: 767px) {
	.weather-main {
		margin-top: 30px;
		margin-bottom: 30px;
		.weather-temp {
			width: 125px;
			height: 125px;
			margin: 30px 0;
		}
	}
}
</style>
