<template>
	<div class="wrapper">
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

	.wrapper {
		margin: 0 auto;
		width: 375px;
		height: 100%;
		max-height: 667px;
		background: linear-gradient(162.39deg, #000AFF 0%, #499DDA 100%);
		color: white;
		padding: 1rem;
	}
</style>
