<template>
  <form @submit.prevent="handleSubmit()">
    <div class="input-group">
      <input type="text" name="search" id="search" class="form-control" placeholder="Search" v-model="editable.search">
      <button class="btn btn-outline-dark" type="submit"><img src="../assets/img/search.png" alt=""></button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const router = useRouter()
    const editable = ref({})
    return {
      editable,
      async handleSubmit() {
        try {
          router.push({ name: "Search" }),
          // await postsService.getPostsByQuery(editable.value.search)
          await postsService.getPosts("", editable.value.search)
          editable.value = {}
        }
        catch(error) {
          logger.log('[handleSubmit]', error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  
</style>