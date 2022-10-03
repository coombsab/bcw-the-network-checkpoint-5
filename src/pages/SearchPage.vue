<template>
  <div class="container-fluid"  v-if="posts.length > 0">
    <div class="row">
      <div class="col-12 p-3 top-pages" v-if="older || newer">
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
      <div class="col-12 posts">
        <ProfileDetails v-for="p in profiles" :key="p.id" :profile="p" :account="p"/>
        <PostCard v-for="p in posts" :key="p.id" :post="p" />
      </div>
      <div class="col-12 p-3">
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
import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import ProfileDetails from "../components/ProfileDetails.vue";

export default {
    setup() {
      async function getPosts(changePage = "api/posts") {
        try {
            await postsService.getPosts(changePage);
        }
        catch (error) {
            logger.log("[getPosts]", error);
            Pop.error(error.message);
        }
      }
        return {
          getPosts,
          posts: computed(() => AppState.posts),
          account: computed(() => AppState.account),
          profiles: computed(() => AppState.profiles),
          newer: computed(() => AppState.newer),
          older: computed(() => AppState.older),
          page: computed(() => AppState.page),
        };
    },
    components: { PostCard, ProfileDetails }
}
</script>

<style scoped lang="scss">
  h5 {
    margin: 0;
  }

  @media (min-width: 768px) {
    .posts {
      overflow-y: auto;
      max-height: 82vh;
    }

    .top-pages {
      display: none;
    }
  }
</style>