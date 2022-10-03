<template>
   <div class="container-fluid">
    <div class="row">
      <div class="col-md-2 pt-3">
        <Login class="shadow"/>
      </div>
      <div class="col-md-10">
        <div class="row">
          <div class="col-12 p-0">
            <Navbar class="shadow"/>
          </div>
          <div class="col-md-9 bg-white p-0">
            <router-view />
          </div>
          <div class="col-md-3 pt-3 bg-white">
            <AdCard v-for="a in ads" :ad="a"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Login from "./components/Login.vue"
import { logger } from "./utils/Logger.js"
import { adsService } from "./services/AdsService.js"
import AdCard from "./components/AdCard.vue"

export default {
  setup() {
    async function getAds() {
      try {
        await adsService.getAds()
      }
      catch(error) {
        logger.log('[getAds]', error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getAds()
    })
    return {
      appState: computed(() => AppState),
      ads: computed(() => AppState.ads),
    }
  },
  components: { Navbar, Login, AdCard }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
