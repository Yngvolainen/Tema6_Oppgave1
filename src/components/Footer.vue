<template>
    <footer class="footer">
        <button class="footer__go-back" @click="goBack"><img v-show="canWeGoBack" src="/images/ChevronLeft.svg" alt="go one day back"></button>
        
        <!-- <section class="footer__weekday">{{this.$store.state.weekday}}</section> -->
        <section class="footer__weekday">{{getWeekday}}</section>

        <button class="footer__go-forwards" @click="goForward"><img v-show="canWeGoForwards" src="/images/ChevronRight.svg" alt="go one day forwards"></button>
    </footer>
</template>

<script>

export default {
    data() {
        return {

        }
    },
    methods: {
        async goBack() {
            await this.$store.dispatch('goOneDayBack', -8)
            this.$store.dispatch('getDate')
            // console.log('clicked back')
        },
        async goForward() {
            await this.$store.dispatch('goOneDayForward', 8)
            this.$store.dispatch('getDate')
            // console.log('clicked forward')
        }
    },
    computed: {
        canWeGoBack() {
            if (this.$store.state.daysFromNow === 0) {
                return false
            } 
            return true
        },
        canWeGoForwards() {
            if (this.$store.state.daysFromNow === 4) {
                return false
            } 
            return true
        },
        getWeekday() {
            return this.$store.state.weekday
        }
    }
}
</script>

<style>
    .footer {
        margin: 0 auto;
        width: 100%;
        max-width: var(--max-width-global);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }

    .footer img {
        height: var(--icon-size-medium);
    }

    .footer__weekday {
        text-align: center;
    }

    .footer__go-back {
        justify-self: start;
    }

    .footer__go-forwards {
        justify-self: end;
    }
</style>