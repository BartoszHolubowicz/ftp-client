<template>
  <nav class="uk-navbar-container" uk-navbar="offset: 0">
		<div class="uk-navbar-left">
			<ul class="uk-navbar-nav">
				<a class="uk-navbar-item uk-logo" href="#">BowicsFTP</a>
				<li class="uk-parent">
					<a href="#">Connection</a>
					<div class="uk-navbar-dropdown">
						<ul class="uk-nav uk-navbar-dropdown-nav">
							<li class="uk-nav-header">Connection</li>
							<li><a href="#" uk-toggle="target: #modal-new-connection">Connect to FTP...</a></li>
						</ul>
					</div>
				</li>
				<li><a href="#">Options</a></li>
			</ul>
		</div>
	</nav>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style>

</style>