<template>
    <footer class="footer">
        <button @click="goBack"><img v-show="canWeGoBack" src="/images/Previous.svg" alt=""></button>
        
        <section>{{this.$store.state.weekday}}</section>

        <button @click="goForward"><img v-show="canWeGoForwards" src="/images/Next.svg" alt=""></button>
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
            } else {
                return true
            }
        },
        canWeGoForwards() {
            if (this.$store.state.daysFromNow === 4) {
                return false
            } else {
                return true
            }
        }
    }
}
</script>

<style>
    .footer {
        display: flex;
        justify-content: space-between;
        justify-items: center;
    }
</style>