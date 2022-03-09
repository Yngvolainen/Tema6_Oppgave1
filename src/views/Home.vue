<template>
	<main class="weather">
		<!-- display silly gif while loading weather -->
		<div class="weather__loading" v-if="!$store.state.weatherLoaded"><img src="images/loading.gif" alt="loading">
		</div>

		<div class="weather__items" v-else>
			<div>
				<div class="weather__description">
					<h2>
						{{weather.weather[0].description}}
					</h2>
				</div>
			</div>

			<div class="weather__icon">
				<img :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`" alt="weathericon">
			</div>

			<div class="weather__subitems">
				<div class="weather__temperature">
					<h3>
						{{weather.main.temp}} ℃
					</h3>
				</div>
				<div class="weather__wind">
					<h3>
						{{weather.wind.speed}} m/s
					</h3>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
export default {
	data() {
		return {
			weather: {
				weather: [{
					description: 'weather description',
					icon: ''
				}],
				main: {
					temp: 'celsius'},
				wind: {
					speed: 'm/s'},
			},
		}
	},
	// Hent vær når mounted
	async mounted() {
		await this.$store.dispatch('getWeatherInfo');
		this.weather = this.$store.getters.getWeather
	},
	// Oppdater vær når updated
	updated() {
		this.weather = this.$store.getters.getWeather
	}
}
</script>

<style scoped>
	.weather__loading {
		height: 80%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}
	.weather__items {
		height: 80%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
	}
	.weather__icon {
		width: 80%;
	}
	.weather__subitems {
		height: 2rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.weather__temperature {
		padding-right: 25px;
	}
	.weather__wind {
		padding-left: 25px;
		border-left: 1px solid white;
	}
</style>