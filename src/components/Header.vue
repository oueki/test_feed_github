<template>


<nav class="nav">
  <div class="nav-left">
    <a class="nav-item">
      <img :src="user.avatar_url" :alt="user.login">
    </a>
    <router-link to="/" activeClass="is-active" class="nav-item is-tab">Feed List</router-link>
  </div>


  <div class="nav-right nav-menu">
  
    <span class="nav-item">
      <a class="button" >
        <span>{{user.login}}</span>
      </a>
      <a class="button is-danger" v-if="auth" @click="logoutUser">
        <span>Logout</span>
      </a>
    </span>
  </div>
</nav>


</template>

<script>
export default {

	data(){
		return {
			auth: false
		}
	},

	computed:{
		user(){
			const user = this.$store.getters.user;

			if(! user){
				const default_user = {};
				default_user.login = "Unauthorized User";
				default_user.avatar_url = "https://avatars2.githubusercontent.com/u/11378396";
				return default_user;
			}

			this.auth = true;
			
			return user;
		}
	},
	methods:{
		logoutUser(){
			this.auth = false;
			this.$store.dispatch('logout');
		}
	}

}
</script>

<style>

	.nav{
		margin-bottom: 1em;
	}

</style>