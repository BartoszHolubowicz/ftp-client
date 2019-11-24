<template>
	<div class="uk-container">
		<Navbar></Navbar>
		<div class="no-connection uk-column-12 uk-flex uk-flex-row uk-flex-center uk-flex-middle">
			<div class="uk-card uk-card-default uk-card-body uk-width-1-3@m uk-width-1-2@s uk-text-center">
				<h3 class="uk-card-title">Connection not found</h3>
				<span class="uk-icon" uk-icon="icon: server; ratio: 2"></span>
				<p>Seems that you're not connected to any FTP server. Let's fix that!</p>
				<button class="uk-button uk-button-primary">New connection</button>
			</div>
		</div>
	</div>
</template>

<script>
	import Navbar from './Navbar.vue';

	export default {
		name: 'App',
		data() {
			return {
				connected: false
			}
		},
		components: {
			Navbar
		}
	}
</script>

<style lang="scss">
.no-connection {
	height: 100vh;
	width: 100vw;
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;

	.uk-card {
		pointer-events: all;
	}
}
</style>