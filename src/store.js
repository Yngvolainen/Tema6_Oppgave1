export default {
	state() {
		return {
			city: 'Oslo',
			weekday: '',
			weather: {},
			weatherLoaded: false,
			error: '',
			client_id: import.meta.env.VITE_WEATHER_CLIENT_ID
		}
	},
	getters: {
		getWeather(state) {
			return state.weather
		},
		getCity(state) {
			return state.city
		},
		getWeekday(state) {
			return state.weekday
		},
		getCountry(state) {
			return state.weather.sys.country
		}
	},
	mutations: {
		setWeather(state, weatherInfo) {
			state.weather = weatherInfo;
			state.weatherLoaded = true;
			// console.log(state.weather)
		},
		setWeekday(state, currentDate) {
			state.weekday = currentDate;
		},
		setCity(state, change) {
			state.city = change;
		},
		setError(state, message) {
			state.error = message
		}
	},
	actions: {
		// get day of week, with help from:
		// https://www.w3schools.com/jsref/jsref_getday.asp
		// and set to store
		getDate(store) {
			const weekday = ["Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag","Søndag","Mandag","Tirsdag"];
			const d = new Date();
			let day = weekday[d.getDay()+0];
			store.commit('setWeekday', day)
		},
		// get weather from API with correct city, commit change to store
		async getWeatherInfo(store) {
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&appid=${this.state.client_id}`
			const response = await fetch(url);

			// KRØLLLLLLLLL fordi store? 🤔
			// 
			// try {
			// 	console.log('trying to try')
			// 	await this.handleResponse(response)
			// } catch(error) {
			// 	store.commit('setError', error.message)
			// 	console.log('fjaaaaas')
			
			const weatherInfo = await response.json();
			store.commit('setWeather', weatherInfo);
			console.log(weatherInfo)
		},
		changeCity(store, change) {
			store.commit('setCity', change);
		}
	}
};
