<template>
  <span class="navbar-text">
    <button
      class="btn selectable text-shadow text-uppercase my-2 my-lg-0"
      @click="login"
      v-if="!user.isAuthenticated"
    >
      Login
    </button>
    
    <div class="d-flex justify-content-center picture-container" v-if="account.picture || user.picture">
      <router-link :to="{ name: 'Account' }">
        <img :src="account.picture || user.picture" alt="account photo" class="account-picture" title="View Account">
      </router-link>
      <img src="../assets/img/Graduated.png" alt="" v-if="account.graduated" class="graduated-icon">
    </div>
    <div class="d-flex flex-column align-items-center mt-5">
      <h5>{{account.name}}</h5>
    </div>

    <!-- <div class="dropdown my-2 my-lg-0" v-else>
      <div
        class="dropdown-toggle selectable"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        id="authDropdown"
      >
        <div v-if="account.picture || user.picture">
          <img
            :src="account.picture || user.picture"
            alt="account photo"
            height="40"
            class="rounded"
          />
          <span class="mx-3 text-shadow">{{ account.name || user.name }}</span>
        </div>
      </div>
      <div class="dropdown-menu p-0 list-group w-100" aria-labelledby="authDropdown">
        <router-link :to="{ name: 'Account' }">
          <div class="list-group-item list-group-item-action hoverable">
            Manage Account
          </div>
        </router-link>
        <div class="list-group-item list-group-item-action hoverable text-danger" @click="logout">
          <i class="mdi mdi-logout"></i>
          logout
        </div>
      </div>
    </div> -->
  </span>
</template>

<script>
import { computed } from 'vue'
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
