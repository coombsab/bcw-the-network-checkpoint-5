<template>
  <div class="card my-3 bg-theme-secondary elevation-2">
    <div class="card-header d-flex justify-content-between">
      <div class="d-flex align-items-center gap-4">
        <img :src="post.creator.picture" :alt="post.creator.name" :title="post.creator.name" class="profile-img">
        <div>
          <p>{{post.creator.name}}</p>
          <div class="d-flex gap-2 align-items-center text-less-important">
            <p>{{getTime()}}</p>
            <img src="../assets/img/Graduated.png" alt="Grad" class="grad-icon" v-if="post.creator.graduated">
          </div>
        </div>
      </div>
      <div v-if="post.creator.id == account.id">
        <img src="../assets/img/bi_three-dots.png" alt="">
      </div>
    </div>
    <div class="card-body">
      <p>{{post.body}}</p>
      <img :src="post.imgUrl" alt="Image Not Loading" class="img-fluid rounded" v-if="post.imgUrl">
    </div>
    <div class="card-footer d-flex gap-2 justify-content-end align-items-center">
      <img src="../assets/img/ant-design_heart-outlined.png" alt="Like Icon">
      <p>{{post.likes.length}}</p>
    </div>
  </div>
  
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";

export default {
  props: {
    post: { type: Post, required: true }
  },
  setup(props) {
    function getTime() {
      const today = new Date()
      const date = new Date(props.post.createdAt)
      const dayDiff = today.getDate() - date.getDate()
      const timeDiff = today.getHours() - date.getHours()
      let time
      if (dayDiff < 1) {
        time = timeDiff + "h"
      } else {
        time = dayDiff + "d"
      }
      // time += " " + date.toDateString() + " " + date.toLocaleTimeString()
      
      return time
    }
    return {
      getTime,
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped lang="scss">
  p {
    margin: 0;
  }

  .profile-img {
    height: 3.44rem;
    width: 3.44rem;
    object-position: center;
    border-radius: 50%;
  }

  .grad-icon {
    height: 1.25rem;
    width: 1.25rem;
  }

  @media (min-width: 768px) {
    .profile-img {
      height: 5rem;
      width: 5rem;
      object-position: center;
      border-radius: 50%;
    }
  }
</style>