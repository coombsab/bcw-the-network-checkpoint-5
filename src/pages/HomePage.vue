<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <PostCard v-for="p in posts" :key="p.id" :post="p" />
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
        async function getPosts() {
            try {
                await postsService.getPosts();
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
            posts: computed(() => AppState.posts)
        };
    },
    components: { PostCard }
}
</script>

<style scoped lang="scss">

</style>
