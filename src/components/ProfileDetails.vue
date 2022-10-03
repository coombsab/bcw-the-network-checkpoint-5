<template>
  <div class="card mt-3 text-shadow" :style="{ backgroundImage: `url(${profile.coverImg})` }">
    <div class="d-flex justify-content-around align-items-center">
      <div class="d-flex justify-content-center picture-container" v-if="profile.picture">
        <img :src="profile.picture" alt="account photo" class="account-picture" title="View Account">
        <img src="../assets/img/Graduated.png" alt="" v-if="profile.graduated" class="graduated-icon">
      </div>
      <div class="text-center">
        <p><em>{{profile.class}}</em></p>
        <p>{{profile.name}}</p>
        <p>{{profile.email}}</p>
      </div>
    </div>
    <div class="p-3 text-center">
      <p>{{profile.bio}}</p>
    </div>    
    <div class="d-flex justify-content-between align-items-center p-3">
      <div class="d-flex gap-2 align-items-center fs-4">
        <div>
          <a :href="account.github" target="_blank" class="text-shadow">
            <i class="mdi mdi-github selectable" :title="profile.github" v-if="profile.github"></i>
          </a>
        </div>
        <div>
          <a :href="account.github" target="_blank" class="text-shadow">
            <i class="mdi mdi-linkedin selectable" :title="profile.linkedin" v-if="profile.linkedin"></i>
          </a>
        </div>
        <div>
          <a :href="account.github" target="_blank" class="text-shadow">
            <i class="mdi mdi-note-text selectable" :title="profile.resume" v-if="profile.resume"></i>
          </a>
        </div>
      </div>
      <button class="btn text-shadow" data-bs-toggle="modal" data-bs-target="#exampleModal" v-if="profile.id === account.id">Edit</button>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <AccountForm/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Profile } from "../models/Profile.js";
import AccountForm from "./AccountForm.vue";

export default {
    props: {
        profile: { type: Profile, required: true },
        account: { type: Object, required: true }
    },
    setup(props) {
        return {
        };
    },
    components: { AccountForm }
}
</script>

<style scoped lang="scss">
  p {
    margin: 0.25rem;
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