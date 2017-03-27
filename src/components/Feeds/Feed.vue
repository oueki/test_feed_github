<template>
	<div :id="'feed_' + feed.id" class="card" >

		<header class="card-header">
			<p class="card-header-title">
			Repositories: {{feed.repo.name}} - Type: {{feed.type}}
			</p>
		</header>
		<div v-if="message.title">
			<div class="card-content">
				<div class="content">
					<p class="button is-danger" v-if="message.action">{{message.action}}</p>
					<p>Acive Link:  <a :href="message.link" target="_blank">{{message.title}}</a>  <br></p>
					<b>Message:</b>  {{message.msg}}
					<hr>
					<small>{{feed.created_at | diffdate}}</small>
				</div>
			</div>
			<footer class="card-footer">
				<router-link :to="{ name:'readmore', params: {feedId:feed.id} }" class="card-footer-item">Read More</router-link>
			</footer>			
		</div>

	</div>

</template>



<script>
	import {modifymessage} from '../../service/utils';

	export default {
		props: ['feed'],
		data(){
			return {
				message: {}
			}
		},

		created(){
			this.message = modifymessage(this.feed);
		}
	}
</script>

<style>
	
	.card{
		margin-bottom: 1em;
	}

</style>