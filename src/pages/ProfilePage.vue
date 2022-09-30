<template>
  <div class="container-fluid profile" v-if="profile" :style="{ backgroundImage: `url(${profile.coverImg})` }">
    <div class="row">
      <div class="col-12">
        <ProfileDetails :profile="profile" :key="profile.id"/>
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
        onMounted(() => {
            getProfile();
        });
        return {
            profile: computed(() => AppState.activeProfile)
        };
    },
    components: { ProfileDetails }
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