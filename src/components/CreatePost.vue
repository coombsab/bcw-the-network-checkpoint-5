<template>
  <div class="card">
    <div class="d-flex p-3 gap-3">
      <div class="text-center mt-2 fit">
        <img :src="account.picture" :alt="account.name" :title="account.name">
      </div>
      <div class="w-100">
        <PostForm />
      </div>
    </div>
  </div>
</template>

<script>;
import { Account } from "../models/Account.js";
import PostForm from "./PostForm.vue";

export default {
  props: {
    account: { type: Object, required: true }
  },
  setup(props) {
      return {
          // account: computed(() => AppState.account)
      };
  },
  components: { PostForm }
}
</script>

<style scoped lang="scss">

  img {
    height: 3.44rem;
    width: 3.44rem;
    object-position: center;
    border-radius: 50%;
  }

  @media (min-width: 768px) {
    img {
      height: 5rem;
      width: 5rem;
      object-position: center;
      border-radius: 50%;
    }
  }
</style>