<template>
    <div class="header">

        <div v-if="!searchActive">
            <nav class="navigation" >
                <span>
                    <h1>{{city}}</h1>
                </span>
                <span>
                    <h6>{{country}}</h6>
                </span>

                <button><img src="images/menu.svg" alt="open search field" @click="searchActive = !searchActive"></button>
            </nav>
        </div>

        <div v-else>
            <nav class="navigation">
                <input type="text" v-model="city" @keyup.enter="searchActive = !searchActive, changeCity">
                <button @click="searchActive = !searchActive, changeCity">GO</button>
            </nav>
        </div>

        <section>{{weekday}}</section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchActive: false,
            city: '',
            country: '',
            weekday: ''
        }
    },
    async mounted() {
        await this.$store.dispatch('getDate');
        this.getCity;
        this.getWeekday;
        this.getCountry
    },
    computed: {
        async changeCity() {
            this.$store.state.weatherLoaded = false;
            await this.$store.dispatch('changeCity', this.city);
            await this.$store.dispatch('getWeatherInfo');
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