export default {
	state() {
		return {
			city: 'Oslo',
			weekday: '',
			weather: {},
			weatherLoaded: false,
			error: ''
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
			console.log(state.weather)
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
			const weekday = ["Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag"];
			const d = new Date();
			let day = weekday[d.getDay()+0];
			store.commit('setWeekday', day)
		},
		// get weather from API with correct city, commit change to store
		// forecast/weather, i api!!!
		async getWeatherInfo(store) {
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&appid=ba434ac1e371ca2c1e463012675c773a`
			const response = await fetch(url);

		// KRØLLLLLLLLL fordi store? 🤔
			// try {
			// 	console.log('trying to try')
			// 	await this.handleResponse(response)
			// } catch(error) {
			// 	store.commit('setError', error.message)
			// 	console.log('fjaaaaas')
			// }
            // const weatherInfo = await response.json();
			// store.commit('setWeather', weatherInfo);
		// },
		// async handleResponse(response) 
		// {
			// if(response.status >= 200 && response.status < 300) 
			// {
				
				const weatherInfo = await response.json();
				store.commit('setWeather', weatherInfo);
				console.log(weatherInfo)

			// 	console.log('this should work, now!')
			// 	return true
			// } else {
			// 	if(response.status === 404) {
			// 		this.showErrorPage
			// 	} else {
			// 		throw new Error('Det er alarm, på vegne av vanvittig mange')
			// 	}
			// }
		},
		changeCity(store, change) {
			store.commit('setCity', change);
		}
	}
};
