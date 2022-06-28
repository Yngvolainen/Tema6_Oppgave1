<template>
    <div class="header">
        <!-- Display as default, or when search is not active -->
        <div v-if="!searchActive">
            <nav class="header__navigation">
                <button class="header__info" @click="toggleAbout">
                        <img src="/images/info.svg" alt="">
                </button>
                <div class="header__location">
                    <span>
                        <h1>{{city}}</h1>
                    </span>
                    
                    <!-- <span>
                        <h6>{{country}}</h6>
                    </span> -->
                </div>

                <button class="header__menu">
                    <img src="/images/Menu.svg" alt="open search field" @click="isSearchActive">
                </button>
            </nav>
        </div>
        <!-- If searchbutton has been clicked, show this -->
        <div v-else>
            <nav class="header__navigation">
                <button class="header__info" @click="toggleAbout">
                    <img src="/images/info.svg" alt="">
                </button>

                <input type="text" ref="input" v-model="city" @keyup.enter="changeCity, isSearchActive()">

                <button class="header__menu" @click="changeCity, isSearchActive()">GO</button>
            </nav>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            searchActive: false,
            city: '',
            // country: '',
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
        },
        // getCountry() {
        //     this.country = this.$store.getters.getCountry
        // },
        isSearchActive() {
            if (this.searchActive === false) {
                this.searchActive = true
                setTimeout(this.selectText, 100)
            } else {
                this.searchActive = false
            }
        },
        selectText() {
            this.$refs.input.select()
        }
    },
    computed: {
        async changeCity() {
            this.$store.state.weatherLoaded = false
            await this.$store.dispatch('changeCity', this.city)
            await this.$store.dispatch('getWeatherInfo')
            this.getCountry
        },
        getCity() {
            this.city = this.$store.getters.getCity
        },
        getWeekday() {
            this.weekday = this.$store.getters.getWeekday
        }
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
        /* display: flex;
        justify-content: space-between;
        align-items: flex-end; */
        display: grid;
        grid-template-columns: 1fr 6fr 1fr;
        align-items: center;
        color: white;
    }

    .header__info img {
        height: 2rem;
        /* position: relative; */
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
        /* position: relative;
        top: -20px;
        right: 0px; */
    }

    .header__menu img {
        height: 1.5rem;
    }

    .header input {
        background: white;
        padding: 0.5rem;
        border-radius: 3px;
    }
</style>   