<template>
	<main class="weather">
		<!-- display silly gif while loading weather -->
		<div class="weather__loading" v-if="!$store.state.weatherLoaded">
			<img src="images/loading.gif" alt="loading weather">

			<p>Loading Weather Info, if at all possible...</p>
		</div>
		<!-- else actually display weather -->
		<div class="weather__items" v-else>
			<div>
				<div class="weather__description">
					<h2>
						{{weather.list[getIndex].weather[0].description}}
					</h2>
				</div>
			</div>

			<div class="weather__icon">
				<img :src="`http://openweathermap.org/img/wn/${weather.list[getIndex].weather[0].icon}@4x.png`" alt="weathericon">
			</div>

			<div class="weather__subitems">
				<div class="weather__temperature">
					<h3>
						{{weather.list[getIndex].main.temp}} ℃
					</h3>
				</div>

				<div class="weather__wind">
					<h3>
						{{weather.list[getIndex].wind.speed}} m/s
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
			position: {},
			// placeholder for weatherinfo for testing purposes, and in case of emergency
			weather: {
				list: [{
					main: {
						temp: 0
					},
					weather: [{
						description: 'weather description',
						icon: '04d'
					}],
					wind: {
						speed: 0,
						deg: 0
					}
				}]
			}
		}
	},
	// Hent vær når created
	async created() {
		await this.getCoordinates(),
		await this.$store.dispatch('getWeatherInfo');
		this.weather = this.$store.getters.getWeather
	},

	// Oppdater vær når...updated, dvs man har søkt etter en annen by
	updated() {
		this.weather = this.$store.getters.getWeather
	},
	methods: {
		getCoordinates() {
			navigator.geolocation.getCurrentPosition(position => {
			const { latitude, longitude } = position.coords;
			console.log(position.coords)
			});
		},
	},
	computed: {
		getIndex() {
			return this.$store.getters.getIndex
		}
	}
}
</script>

<style>
	.weather__loading,
	.weather__items {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.weather__description {
		text-transform: capitalize;
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