<template>

  <section class="section" v-if="feed">
	<div class="container">
		<div class="heading">
			<router-link :to="home_link"  class="button is-success">Return Back</router-link>
			<h1 class="title">Repositories: {{feed.repo.name}}</h1>
			<h2 class="subtitle">
				Type:{{feed.type}}
			</h2>
			<hr>
		</div>

		<div v-if="load">
			<div class="spinner">
			  <div class="bounce1"></div>
			  <div class="bounce2"></div>
			  <div class="bounce3"></div>
			</div>
		</div>

		<div v-if="error">
			<div class="notification is-danger">
				{{feed.type}} : {{error}}
			</div>
		</div>

		<div v-if="messages">

			<app-comments 	
				v-if="type_msg == 'comment'"
				v-for="message in messages" 
				:key="message.id"
				:comment='message'></app-comments>

			<app-commit 	
				v-if="type_msg == 'commit'"
				v-for="message in messages" 
				:key="message.id"
				:commit='message'></app-commit>
			
		</div>
	</div>
  </section>

</template>



<script>

	import Comments from '../Messages/Comments.vue';
	import Commit from '../Messages/Commit.vue';

	export default {
		data(){
			return {
				messages:null,
				type_msg:'comment',
				load:true,
				error: null,
			}
		},

		beforeRouteEnter (to, from, next) {
			next(vm => {
			  	if(typeof vm.feed == 'undefined'){
			  		next('/');
			  	}
			})
		},

		components:{
			appComments:Comments,
			appCommit:Commit,
		},
		computed:{
			feed(){
				return this.$store.getters.getFeedById(this.$route.params.feedId);
			},
			home_link(){
				return '/#feed_' + this.$route.params.feedId;
			}
		},
		created(){
			this.fetchDataComment()
		},
		watch: {
			'$route': 'fetchDataComment'
		},
		methods:{
			fetchDataComment(){

				if(! this.feed){
					return;
				}

				const payload = this.feed.payload;
				if(payload.issue){
					const link_comment_url = this.feed.payload.issue.comments_url;
					fetch(link_comment_url)
					.then(response => response.json())
					.then(messages => {
						this.messages = messages;
						this.load = false;
					});	
				}else{
					this.type_msg = 'commit';
					this.messages = payload.commits;
					this.load = false;
				}

				if(typeof this.messages == 'undefined'){
					this.error = 'No Messages';
				}
			}
		}

	}

</script>

<style>

.spinner {
  margin: 100px auto 0;
  width: 70px;
  text-align: center;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: #333;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}

</style>