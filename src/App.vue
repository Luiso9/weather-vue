<template>
	<transition name="fade" mode="out-in" appear>
		<div class="card">
			<WeatherSearch />
			<WeatherMain />
			<WeatherInfo />
		</div>
    <div class="img">
      
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
@import url("https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400;0,700;0,800;0,900;1,300;1,500&display=swap");

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
	border-radius: 20px;
	box-shadow: 0 0 70px fade(rgb(104, 103, 103), 30);
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
