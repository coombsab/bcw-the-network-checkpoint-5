<template>
  <div class="card my-3 bg-theme-secondary">
    <div class="card-header d-flex gap-2 align-items-center">
      <img :src="post.creator.picture" :alt="post.creator.name" :title="post.creator.name">
      <p>{{new Date(post.createdAt).toLocaleString()}}</p>
    </div>
    <div class="card-body">
      <p>{{post.body}}</p>
      <img :src="post.imgUrl" alt="Image Not Loading" class="img-fluid rounded">
    </div>
    <div class="card-footer d-flex gap-2 justify-content-end align-items-center">
      <img src="../assets/img/ant-design_heart-outlined.png" alt="Like Icon">
      <p>{{post.likes.length}}</p>
    </div>
  </div>
  
</template>

<script>
import { Post } from "../models/Post.js";

export default {
  props: {
    post: { type: Post, required: true }
  },
  setup(props) {
    
    return {
      
    }
  }
}
</script>

<style scoped lang="scss">
  p {
    margin: 0;
  }

  .card-header>img {
    height: 2rem;
    width: 2rem;
    object-position: center;
    border-radius: 50%;
  }
</style>