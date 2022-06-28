<template>
    <div class="header">
        <!-- Display as default, or when search is not active -->
        <!-- this comment is only for good luck (hoping netlify will accept this site) -->
        <div v-if="!searchActive">
            <nav class="header__navigation">
                <button class="header__info" @click="toggleAbout">
                    <!-- <router-link :to="{name: 'about'}"> -->
                        <img src="/images/info.svg" alt="">
                    <!-- </router-link> -->
                </button>
                <div class="header__location">
                    <span>
                        <h1>{{city}}</h1>
                    </span>
                    
                    <span>
                        <h6>{{country}}</h6>
                    </span>
                </div>

                <button class="header__menu">
                    <img src="/images/Menu.svg" alt="open search field" @click="searchActive = !searchActive">
                </button>
            </nav>
        </div>
        <!-- If searchbutton has been clicked, show this -->
        <div v-else>
            <nav class="header__navigation">
                <input type="text" v-model="city" @keyup.enter="searchActive = !searchActive, changeCity">

                <button class="header__menu" @click="searchActive = !searchActive, changeCity">GO</button>
            </nav>
        </div>

        <!-- <section>{{this.$store.state.weekday}}</section> -->
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
    async created() {
        await this.$store.dispatch('getDate')
        this.getCity
        this.getWeekday
    },
    methods: {
        toggleAbout() {
            if (!this.$store.state.aboutVisible) {
                this.$router.push({name: 'about'})
                this.$store.state.aboutVisible = true
            } else {
                this.$router.push({name: 'home'})
                this.$store.state.aboutVisible = false
            }
        }
    },
    computed: {
        async changeCity() {
            this.$store.state.weatherLoaded = false
            await this.$store.dispatch('changeCity', this.city)
            await this.$store.dispatch('getWeatherInfo')
            this.country = this.$store.getters.getCountry;
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
        },
    }
}
</script>

<style>
    .header__navigation button {
        color: white;
        /* height: 1rem;  */
    }

    .header__navigation {
        /* max-width: 400px; */
        height: 50px;
        text-transform: capitalize;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        color: white;
    }

    .header__info {
        position: relative;
        /* top: 0px;
        left: 10px; */
    }

    .header__location {
        width: 100%;
        text-align: center;
        /* display: flex;
        align-items: flex-end; */
    }

    .header__menu {
        position: relative;
        top: -20px;
        right: 0px;
    }

    .header input {
        background: white;
        padding: 0.5rem;
        border-radius: 3px;
    }
</style>   