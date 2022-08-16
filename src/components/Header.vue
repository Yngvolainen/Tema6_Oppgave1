<template>
    <div class="header">
        <!-- Display as default, or when search is not active -->
        <div v-if="!searchActive">
            <nav class="header__navigation">
                <button class="header__info" @click="toggleAbout">
                        <img src="/images/InfoCircle.svg" alt="open info page">
                </button>

                <div class="header__location" @click="isSearchActive()">
                    <h1>{{city}}</h1>
                </div>

                <button class="header__search">
                    <img src="/images/Search.svg" alt="open search field" @click="isSearchActive()">
                </button>
            </nav>
        </div>
        <!-- If searchbutton has been clicked, show this -->
        <div v-else>
            <nav class="header__navigation">
                <button class="header__info" @click="toggleAbout">
                    <img src="/images/InfoCircle.svg" alt="">
                </button>

                <input type="text" ref="input" v-model="city" @keyup.enter="changeCity, isSearchActive()">

                <button class="header__search" @click="changeCity, isSearchActive()">
                    <img src="/images/Search.svg" alt="open search field">
                </button>
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
    .header {
        margin: 0 auto;
        width: 100%;
        max-width: var(--max-width-global);
    }

    .header img {
        height: var(--icon-size-medium);
    }

    .header__navigation {
        height: 3.5rem;
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        text-transform: capitalize;
    }

    .header__info {
        justify-self: start;
    }

    .header input {
        background: white;
        padding: 0.5rem;
        border-radius: 3px;
    }

    .header__search {
        justify-self: end;
    }
</style>   