<template>
  <div class="container-fluid profile" v-if="profile">
    <div class="row">
      <div class="col-12 p-3 bg-white top-pages" v-if="older || newer">
        <div class="d-flex justify-content-around align-items-center">
          <button class="btn" @click="getPostsByProfileId(newer)" :disabled="!newer">
            <h5>&lt Newer</h5>
          </button>
          <h5>{{page}}</h5>
          <button class="btn" @click="getPostsByProfileId(older)" :disabled="!older">
            <h5>Older &gt</h5>
          </button>
        </div>
      </div>
      <div class="col-12 profile-info">
        <ProfileDetails :profile="profile" :key="profile.id" :account="account"/>
        <CreatePost class="mt-3" :account="profile" v-if="profile.id === account.id"/>
        <PostCard v-for="p in posts" :key="p.id" :post="p"/>
      </div>
      <div class="col-12 p-3 bg-white">
        <div class="d-flex justify-content-around align-items-center">
          <button class="btn" @click="getPostsByProfileId(newer)" :disabled="!newer">
            <h5>&lt Newer</h5>
          </button>
          <h5>{{page}}</h5>
          <button class="btn" @click="getPostsByProfileId(older)" :disabled="!older">
            <h5>Older &gt</h5>
          </button>
        </div>
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
        async function getPostsByProfileId(changePage) {
          try {
            await profilesService.getPostsByProfileId(changePage, route.params.id)
          }
          catch(error) {
            logger.log('[getPostsByProfileId]', error)
            Pop.error(error.message)
          }
        }

        onMounted(() => {
            getProfile();
            getPostsByProfileId();
        });
        return {
          getPostsByProfileId,
          profile: computed(() => AppState.activeProfile),
          account: computed(() => AppState.account),
          posts: computed(() => AppState.posts),
          page: computed(() => AppState.page),
          newer: computed(() => AppState.newer),
          older: computed(() => AppState.older)
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
  }

  

  @media (min-width: 768px) {
    .profile-info {
      height: 82vh;
      overflow-y: auto;
    }

    .top-pages {
      display: none;
    }
  }
</style>