<template>
  <div class="about text-center">
    <!-- <ProfileDetails :account="account" :profile="account"/> -->
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import ProfileDetails from "../components/ProfileDetails.vue";
import { Profile } from "../models/Profile.js";

export default {
    setup() {
      // function getProfile() {
      //   AppState.activeProfile = new Profile(AppState.account)
      // }
      // onMounted(() => {
      //   getProfile()
      // })
        return {
            account: computed(() => AppState.account),
            // profile: computed(() => AppState.activeProfile)
        };
    },
    components: { ProfileDetails }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
