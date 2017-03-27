<template>
	<div>
		<section class="hero is-light" v-show="show">
		  <div class="hero-body">
		    <div class="container has-text-centered">
		      <a :href="link_login" class="button is-large ">GitHub Login</a>	
		    </div>
		  </div>
		</section>
	</div>
</template>


<script>
	export default {

		data(){
			return {
				show: false
			}
		},

		computed:{
			link_login(){
				const clientId = "fc3faed52d63e22777ef";
				const redirectUrl = "http://localhost:8080/authenticate/";
				const URL = "https://github.com/login/oauth/authorize?client_id=" + clientId + "&redirect_uri=" + redirectUrl + "&scope=repo";

				return URL;
			}
		},

		created(){
			
			const urlParams = new URLSearchParams(window.location.search);
			
			if(urlParams.has('token')){
				this.show = false;
				this.$store.dispatch('initAuth', urlParams.get('token'))
			}else{
				this.show = true;
			}

		}
	}
</script>