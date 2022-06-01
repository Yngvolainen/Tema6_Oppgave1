<template>
    <div class="header">
        <!-- Display as default, or when search is not active -->
        <div v-if="!searchActive">
            <nav class="navigation">
                <button>
                    <router-link :to="{name: 'about'}">
                        <img src="/images/info.svg" alt="">
                    </router-link>
                </button>

                <span>
                    <h1>{{city}}</h1>
                </span>
                
                <span>
                    <h6>{{country}}</h6>
                </span>

                <button><img src="/images/menu.svg" alt="open search field" @click="searchActive = !searchActive"></button>
            </nav>
        </div>
        <!-- If searchbutton has been clicked, show this -->
        <div v-else>
            <nav class="navigation">
                <input type="text" v-model="city" @keyup.enter="searchActive = !searchActive, changeCity">

                <button @click="searchActive = !searchActive, changeCity">GO</button>
            </nav>
        </div>

        <section>{{this.$store.state.weekday}}</section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchActive: false,
            city: '',
            country: 'NO',
            weekday: ''
        }
    },
    async created() {
        await this.$store.dispatch('getDate')
        this.getCity
        this.getWeekday
    },
    methods: {
       
    },
    computed: {
        async changeCity() {
            this.$store.state.weatherLoaded = false
            await this.$store.dispatch('changeCity', this.city)
            await this.$store.dispatch('getWeatherInfo')
            // this.country = this.$store.getters.getCountry;
            this.getCountry
        },
        getCity() {
            this.city = this.$store.getters.getCity
        },
        getWeekday() {
            this.weekday = this.$store.getters.getWeekday
        },
        getCountry() {
            this.country = this.$store.getters.getCountry
        }
    }
}
</script>

<style>
    .header button {
        color: white;
    }

    .navigation {
        height: 50px;
        text-transform: capitalize;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
    }

    .header input {
        background: white;
        padding: 0.5rem;
    }
</style>   