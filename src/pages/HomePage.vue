<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <PostCard v-for="p in posts" :key="p.id" :post="p" />
        <div class="d-flex justify-content-around align-items-center">
          <button class="btn" @click="getPosts(next)" :disabled="!next">
            <h5>&lt Newer</h5>
          </button>
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
          previous: computed(() => AppState.previousPage)
        };
    },
    components: { PostCard }
}
</script>

<style scoped lang="scss">

</style>
