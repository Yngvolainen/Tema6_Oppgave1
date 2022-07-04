<template>
	<main class="weather">
		<!-- display silly gif while loading weather -->
		<div class="weather__loading" v-if="!$store.state.weatherLoaded">
			<img src="/images/loading.gif" alt="loading weather">

			<p>Looking up your city</p>
		</div>
		<!-- else actually display weather -->
		<div class="weather__items" v-else>
			
			<div class="weather__icon">
				<img :src="`http://openweathermap.org/img/wn/${weather.list[getIndex].weather[0].icon}@4x.png`" alt="weathericon">
			</div>

			<div class="weather__temperature">
				<h2>
					{{Math.round(weather.list[getIndex].main.temp)}} ºc
				</h2>
			</div>

			<div class="weather__subitems">
				<div class="weather__description">
					<p>
						{{weather.list[getIndex].weather[0].description}}
					</p>
				</div>	

				<div class="weather__wind">
					<p>
						{{Math.round(weather.list[getIndex].wind.speed)}} m/s
					</p>
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
			// client_id: '',
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
			console.log(latitude, longitude)
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
	.weather__items,
	.weather__loading
	{
		height: min-content;
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		align-items: center;
	}
	.weather img {
		width: 300px;
	}

	.weather__temperature {
		margin-bottom: 2rem;
	}

	.weather__temperature h2 {
		font-size: 3rem;
	}

	.weather__subitems {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
	}

	.weather__description {
		padding-right: 25px;
	}

	.weather__wind {
		padding-left: 25px;
	}
</style>