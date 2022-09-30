<template>
  <nav class="navbar navbar-expand-lg bg-linear-gradient px-3 d-flex justify-content-between">
      <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
        <div class="d-flex flex-column align-items-center">
          <img alt="logo" src="../assets/img/Network.png" height="45" />
        </div>
      </router-link>
      <SearchForm/>
    <!-- <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button> -->

    <!-- <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarText"> -->
      <!-- <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
            About
          </router-link>
        </li>
      </ul> -->
      <!-- LOGIN COMPONENT HERE -->
      <!-- <Login/> -->
    <!-- </div> -->
  </nav>
</template>

<script>
import Login from './Login.vue'
import SearchForm from './SearchForm.vue'
export default {
  setup() {
    return {}
  },
  components: { Login, SearchForm }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
