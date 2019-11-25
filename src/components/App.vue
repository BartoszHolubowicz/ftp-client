<template>
	<div class="uk-container">
		<Navbar></Navbar>
		<Dashboard></Dashboard>
	</div>
</template>

<script>
	import Navbar from './Navbar.vue';
	import Dashboard from './Dashboard.vue';

	export default {
		name: 'App',
		components: {
			Navbar, Dashboard
		},
		mounted() {
			console.log(this.$store);
		}
	}
</script>

<style lang="scss">

</style>