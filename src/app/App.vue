<template>
	<div class="app__wrapper">
		<Header />
		<RouterView />
		<Footer />
	</div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
	components: {
		Header,
		Footer
	},
	data() {
		return {
		}
	}
}
</script>

<style>
	@import '../style/reset.css';
	@import '../style/variables.css';
	@import '../style/fonts.css';
	@import '../style/style.css';

	.app__wrapper {
		margin: 0 auto;
		max-width: 540px;
		height: 100%;
		max-height: 900px;
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		background: linear-gradient(162.39deg, #000AFF 0%, #499DDA 100%);
		color: white;
		padding: 1rem;
	}
</style>
