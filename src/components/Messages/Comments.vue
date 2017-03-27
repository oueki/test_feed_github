<template>
<div class="box">
  <article class="media">
	<div class="media-left">
	  <figure class="image is-64x64">
		<img :src="comment.user.avatar_url" :alt="comment.user.login">
	  </figure>
	</div>
	<div class="media-content">
	  <div class="content">
		<p>
		  <strong>{{comment.user.login}}</strong> <small>{{comment.created_at | diffdate}}</small>
		  <br>
		  <div v-html="body"></div>
		</p>
	  </div>
	</div>
  </article>
</div>
</template>


<script>
	export default {
		props: ['comment'],
		computed:{
			body(){
				return this.comment.body.replace(/([^>])\n/g, '$1<br/>');
			}
		}
	}
</script>
