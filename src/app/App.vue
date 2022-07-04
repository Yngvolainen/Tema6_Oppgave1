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
		font-family: var(--font-family);
		position: relative;
		color: white;
		background: var(--background-gradient);
		margin: 0 auto;
		padding: 1rem;
		height: 100%;
		/* max-height: 1200px; */
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
	}
</style>
