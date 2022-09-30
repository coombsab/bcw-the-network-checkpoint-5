<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 order-1 order-md-0" id="posts">
        <CreatePost v-if="account" :account="account"/>
        <PostCard v-for="p in posts" :key="p.id" :post="p" />
      </div>
      <div class="col-12 p-3 order-0 order-md-1">
        <div class="d-flex justify-content-around align-items-center">
          <button class="btn" @click="getPosts(next)" :disabled="!next">
            <h5>&lt Newer</h5>
          </button>
          <h5>{{page}}</h5>
          <button class="btn" @click="getPosts(previous)" :disabled="!previous">
            <h5>Older &gt</h5>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { logger } from "../utils/Logger.js"
import { postsService } from "../services/PostsService.js"
import Pop from "../utils/Pop.js"
import { onMounted } from "vue"
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState.js"
import PostCard from "../components/PostCard.vue"
import CreatePost from "../components/CreatePost.vue"

// TODO
// look into scroll-snap and popover in bootstrap

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
        onMounted(() => {
            getPosts();
        });
        return {
          getPosts,
          posts: computed(() => AppState.posts),
          next: computed(() => AppState.nextPage),
          previous: computed(() => AppState.previousPage),
          page: computed(() => AppState.page),
          account: computed(() => AppState.account)
        };
    },
    components: { PostCard, CreatePost }
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
