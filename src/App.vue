<template>
	<section class="container">
		<app-header></app-header>

		<div class="columns">
			<div class="column">
				<router-view></router-view>
			</div>
		</div>
		
	</section>	
</template>

<script>
	import Header from './components/Header.vue';
	export default {
		components:{
			appHeader:Header
		},

		created(){

			if (localStorage.user) {
				const user  =  JSON.parse(localStorage.user);
				this.$store.dispatch('loadUser', user);
				const FEED_URL = `https://api.github.com/users/${user.login}/events?access_token=${user.token}`;
				
				fetch(FEED_URL)
				.then(response => response.json())
				.then(feed => this.$store.dispatch('initFeeds', feed));
			}

		}
	}
</script>

<style lang="scss">
	body{
		margin-top: 30px;
	}
</style>
