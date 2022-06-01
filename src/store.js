export default {
	state() {
		return {
			weather: {},
			city: 'Oslo',
			weatherLoaded: false,
			weekday: '',
			error: '',
			daysFromNow: 0,
			weatherListIndex: 0,
			error: '',
		}
	},
	getters: {
		// from Home
		getWeather(state) {
			return state.weather
		},
		// from Header
		getCity(state) {
			return state.city
		},
		getWeekday(state) {
			return state.weekday
		},
		getCountry(state) {
			return state.weather.city.country
		},
		getIndex(state){
			return state.weatherListIndex
		},

	},
	mutations: {
		setWeather(state, weatherInfo) {
			state.weather = weatherInfo
			state.weatherLoaded = true
		},
		setWeekday(state, currentDate) {
			state.weekday = currentDate
		},
		setCity(state, change) {
			state.city = change
		},
		goForwards(state, change) {
			if(state.daysFromNow >= 0 && state.daysFromNow < 4) {
				state.weatherListIndex += change
				state.daysFromNow += 1
			} else {
				return
			}
		},
		goBack(state, change) {
			if(state.daysFromNow < 5 && state.daysFromNow > 0) {
				state.weatherListIndex += change
				state.daysFromNow -= 1
			} else {
				return
			}
		}
		// setError(state, message) {
		// 	state.error = message
		// }
	},
	actions: {
		// get day of week, with help from:
		// https://www.w3schools.com/jsref/jsref_getday.asp
		// and set to store

		// from Header
		getDate(store) {
			// lol, weekday hack
			const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday","Wednesday"]
			const d = new Date()
			let day = weekday[d.getDay()+this.state.daysFromNow]
			store.commit('setWeekday', day)
			console.log(day)
		},
		// get weather from API with preset or entered city, commit change to store
		async getWeatherInfo(store) {
			const APP_ID = import.meta.env.VITE_CLIENT_ID;
			// old api below...
			// const url = `https://api.openweathermap.org/data/2.5/onecall?lat=60&lon=11&exclude=minutely,hourly,alerts&units=metric&appid=${this.state.APP_ID}`
			const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&units=metric&appid=${APP_ID}`
			const response = await fetch(url)
			const weatherInfo = await response.json()
			store.commit('setWeather', weatherInfo)

			// KRØLLLLLLLLL fordi store? 🤔
			// 
			// try {
			// 	console.log('trying to try')
			// 	await this.handleResponse(response)
			// } catch(error) {
			// 	store.commit('setError', error.message)
			// 	console.log('fjaaaaas')
		},
		changeCity(store, change) {
			store.commit('setCity', change)
		},
		// from Footer
		goOneDayForward(store, change) {
			store.commit('goForwards', change)
		},
		goOneDayBack(store, change) {
			store.commit('goBack', change)
		}
	}
};
