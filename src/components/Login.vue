<template>
  <span class="navbar-text">
    <button class="btn selectable text-shadow text-uppercase my-2 my-lg-0" @click="login" v-if="!user.isAuthenticated">
      Login
    </button>
    
    <div class="d-flex justify-content-center picture-container" v-if="account.picture || user.picture">
      <router-link :to="{ name: 'Account' }">
        <!-- <router-link :to="{ name: 'Profile', params: { id: account.id }}"> -->
        <img :src="account.picture || user.picture" alt="account photo" class="account-picture" title="View Account">
      </router-link>
      <img src="../assets/img/Graduated.png" alt="" v-if="account.graduated" class="graduated-icon">
    </div>
    <div class="d-flex flex-column align-items-center mt-5">
      <!-- <h6 class=""><em>{{account.class}}</em></h6> -->
      <h5>{{account.name}}</h5>
      <div class="d-flex justify-content-around align-items-center gap-3 fs-2 mt-3">
        <a :href="account.github" target="_blank">
          <i class="mdi mdi-github selectable" :title="account.github"></i>
        </a>
        <a :href="account.linkedin" target="_blank">
          <i class="mdi mdi-linkedin selectable" :title="account.linkedin"></i>
        </a>
        <a :href="account.resume" target="_blank">
          <i class="mdi mdi-note-text selectable" :title="account.resume"></i>
        </a>
      </div>
    </div>
  </span>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}

.dropdown-menu.show {
  transform: scale(1);
}

.hoverable {
  cursor: pointer;
}

.account-picture {
  border-radius: 50%;
  height: 12rem;
  width: 12rem;
  margin-top: 4rem;
}

.picture-container {
  position: relative;
}
.graduated-icon {
  height: 3.4rem;
  width: 3.4rem;
  position: absolute;
  right: 2%;
  bottom: 2%;
}
</style>
