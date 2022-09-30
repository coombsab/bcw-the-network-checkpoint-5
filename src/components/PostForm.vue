<template>
  <form @submit.prevent="handleSubmit()">
    <textarea name="body" rows="5" placeholder="Share whats happening" v-model="editable.body" required></textarea>
    <div class="d-flex justify-content-between mt-3">
      <div class="d-flex gap-2">
        <!-- Fun stuff to make the image icon only clickable when the input line is visible -->
        <img src="../assets/img/image.png" alt="" class="img-icon mt-2" @click="swapBtnInput.isSwitched ? swapBtnInput.isSwitched = !swapBtnInput.isSwitched : ''" :title="swapBtnInput.isSwitched ? 'Hide Input' : ''">
        <button class="btn p-0" type="button" @click="swapBtnInput.isSwitched = !swapBtnInput.isSwitched" v-if="!swapBtnInput.isSwitched">
          <h5>Photo/Video</h5>
        </button>
        <input type="text" name="imgUrl" v-model="editable.imgUrl" :autofocus="swapBtnInput.isSwitched" v-if="swapBtnInput.isSwitched" placeholder="Enter image or video url">
      </div>
      <div class="d-flex gap-2">
        <img src="../assets/img/post.png" alt="" class="post-icon mt-2">
        <button class="btn p-0" type="submit">
          <h5>Post</h5>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from "vue"
import { postsService } from "../services/PostsService.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"

export default {
  setup() {
    const editable = ref({})
    const swapBtnInput = ref({ isSwitched: false})
    
    return {
      editable,
      swapBtnInput,
      async handleSubmit() {
        try {
          // logger.log("Submitting editable", editable)
          await postsService.createPost(editable.value)
          editable.value = {}
        }
        catch(error) {
          logger.log('[handleSubmit]', error)
          Pop.error(error.message)
        }
      },
    }
  }
}
</script>

<style scoped lang="scss">
  textarea {
    background: rgba(246, 249, 249, 0.74);
    border: 2px dashed rgba(57, 196, 198, 0.44);
    border-radius: 3px;
    width: 100%;
    padding: 1rem;
  }

  h5 {
    margin: 0;
  }

  .img-icon {
    height: 1.6rem;
    width: 1.6rem;
  }

  .post-icon {
    height: 1.4rem;
    width: 1.4rem;
  }
</style>