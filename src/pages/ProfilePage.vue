<template>
  <div v-if="profile">
    I'm a profile
  </div>
  <div>
    This is the profile page
  </div>
</template>

<script>
import { computed } from "@vue/reactivity"
import { onMounted } from "vue"
import { useRoute } from "vue-router"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"

export default {
  setup() {
    const route = useRoute()
    async function getProfile() {
      try {
        // await profilesService.getProfileByPostId()
      }
      catch(error) {
        logger.log('[getProfile]', error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getProfile()
    })
    return {
      profile: computed(() => AppState.activeProfile)
    }
  }
}
</script>

<style scoped lang="scss">
  
</style>