<template>
	<div>
		<app-feed 
			v-for="feed in feeds" 
			:key="feed.id"
			:feed='feed'
			></app-feed>
	</div>
</template>

<script>

	import Feed from './Feed.vue';

	export default {
		components:{
			appFeed:Feed
		},
		computed:{
			feeds(){
				return this.$store.getters.feeds;
			}
		}
	}
</script>