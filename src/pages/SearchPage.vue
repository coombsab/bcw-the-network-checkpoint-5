<template>
  <div class="container-fluid"  v-if="posts.length > 0">
    <div class="row">
      <div class="col-12 order-1 order-md-0" id="posts">
        <PostCard v-for="p in posts" :key="p.id" :post="p" />
      </div>
      <div class="col-12 p-3 order-0 order-md-1">
        <div class="d-flex justify-content-around align-items-center">
          <button class="btn" @click="getPosts(newer)" :disabled="!newer">
            <h5>&lt Newer</h5>
          </button>
          <h5>{{page}}</h5>
          <button class="btn" @click="getPosts(older)" :disabled="!older">
            <h5>Older &gt</h5>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="p-3" v-else>
    <h1>Please make a search or return to the <router-link :to="{ name: 'Home'}">home page</router-link>!</h1>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import PostCard from "../components/PostCard.vue";

export default {
    setup() {
        return {
            posts: computed(() => AppState.posts),
            account: computed(() => AppState.account),
            newer: computed(() => AppState.newer),
            older: computed(() => AppState.older),
            page: computed(() => AppState.page),
        };
    },
    components: { PostCard }
}
</script>

<style scoped lang="scss">
  #posts {
    overflow-y: auto;
    max-height: 82vh;
    // TODO maybe try moving scrollbar to the other side at a later point, this mirrors everything in the post too
    // direction: rtl;
  }

  h5 {
    margin: 0;
  }
</style>