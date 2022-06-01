<template>
    <div class="footer">
        <button @click="goBack"><img src="/images/Previous.svg" alt=""></button>
        
        <button @click="goForward"><img src="/images/Next.svg" alt=""></button>
    </div>
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
    }
}
</script>

<style>
    .footer {
        display: flex;
        justify-content: space-between;
        justify-items: flex-end;
    }
</style>