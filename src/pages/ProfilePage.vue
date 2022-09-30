<template>
  <div class="container-fluid profile" v-if="profile" :style="{ backgroundImage: `url(${profile.coverImg})` }">
    <div class="row">
      <div class="col-12">
        <ProfileDetails :profile="profile" :key="profile.id"/>
        <!-- <CreatePost class="mt-3" :account="account"/> -->
        <!-- <PostCard v-for="p in posts" :key="p.id" :post="p"/> -->
      </div>
    </div>
  </div>
  <div class="p-3" v-else>
    <h1>Sorry, there are some issues loading the profile.  Please try refreshing the page or come back later!</h1>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity"
import { onMounted } from "vue"
import { useRoute } from "vue-router"
import { AppState } from "../AppState.js"
import { profilesService } from "../services/ProfilesService.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import ProfileDetails from "../components/ProfileDetails.vue"
import CreatePost from "../components/CreatePost.vue"
import PostCard from "../components/PostCard.vue"

export default {
    setup() {
        const route = useRoute();
        async function getProfile() {
            try {
                await profilesService.getProfileById(route.params.id);
            }
            catch (error) {
                logger.log("[getProfile]", error);
                Pop.error(error.message);
            }
        }
        async function getPostsByProfileId() {
          try {
            await profilesService.getPostsByProfileId(route.params.id)
          }
          catch(error) {
            logger.log('[getPostsByProfileId]', error)
            Pop.error(error.message)
          }
        }
        onMounted(() => {
            getProfile();
            // getPostsByProfileId();
        });
        return {
            profile: computed(() => AppState.activeProfile),
            account: computed(() => AppState.account),
            // posts: computed(() => AppState.posts),
            // page: computed(() => AppState.page),
            // newer: computed(() => AppState.newer),
            // older: computed(() => AppState.older)
        };
    },
    components: { ProfileDetails, CreatePost, PostCard }
}
</script>

<style scoped lang="scss">
  .profile {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 90vh;
    overflow-y: auto;
  }
</style>