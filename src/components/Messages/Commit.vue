<template>
<div class="box">
  <article class="media">
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{commit.author.name}}</strong> <small>@johnsmith</small> <small>31m</small>
          <br>
          {{commit.message}}
        </p>
      </div>
    </div>
  </article>
</div>
</template>


<script>

	export default {
		props: ['commit']
	}


</script>
