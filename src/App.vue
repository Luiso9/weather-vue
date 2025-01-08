<template>
	<transition name="fade" mode="out-in" appear>
		<div>
			<div class="card">
				<WeatherSearch />
				<WeatherMain />
				<WeatherInfo />
			</div>
		</div>
	</transition>
</template>

<script>
import WeatherInfo from "./components/WeatherInfo.vue";
import WeatherSearch from "./components/WeatherSearch.vue";
import WeatherMain from "./components/WeatherMain.vue";
import { mapStores } from "pinia";

export default {
	components: {
		WeatherInfo,
		WeatherSearch,
		WeatherMain,
	},
	computed: {
		...mapStores(),
	},
};
</script>

<style lang="less">
.fade-enter-active,
.fade-leave-active {
	transition: all 1s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
	transform: scale(0.5);
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: "Jost", sans-serif;
}
body {
	overflow: hidden;
	background-image: linear-gradient(
		135deg,
		rgb(12, 31, 48) 0%,
		rgb(1, 5, 16) 75%
	);
}
.app {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
}

.card {
	max-width: var(360px);
	width: 100%;
	padding: 40px;
	background-color: rgb(18, 22, 26);
	border-radius: 20px;
	box-shadow: 0 0 70px fade(rgb(1, 5, 16), 30);
	z-index: 9999;

	@media (max-height: 767px) {
		padding: 30px;
	}
}

@media (max-width: 480px) {
	.card {
		padding: 30px;
	}
}

.footer-text {
	position: absolute;
	bottom: 30px;
	left: 0;
	right: 0;
	margin: auto;
	text-align: center;
	.link {
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		color: #000000;
		font-weight: 500;
		text-shadow: 0 2px 3px fade(black, 20);
		span {
			font-size: 18px;
			margin-left: 5px;
		}
		&:hover {
			text-decoration: underline;
		}
	}
}
</style>
