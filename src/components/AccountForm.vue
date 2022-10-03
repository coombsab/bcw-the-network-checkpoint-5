<template>
  <form @submit.prevent="handleSubmit()" class="">
    <div class="form-floating">
      <input type="email" class="form-control" id="floatingEmail" placeholder="name@example.com" v-model="editable.email">
      <label for="floatingEmail">Email Address</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingName" placeholder="Change Name" v-model="editable.name">
      <label for="floatingName">Name</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingBio" placeholder="Change Bio" v-model="editable.bio">
      <label for="floatingBio">Bio</label>
    </div>
    <div class="form-floating">
      <input type="url" class="form-control" id="floatingPicture" placeholder="Change Picture" v-model="editable.picture">
      <label for="floatingPicture">Picture</label>
    </div>
    <div class="form-floating">
      <input type="url" class="form-control" id="floatingCoverImg" placeholder="Change Cover Image" v-model="editable.coverImg">
      <label for="floatingCoverImg">Cover Image</label>
    </div>
    <div class="form-floating">
      <input type="url" class="form-control" id="floatingGithub" placeholder="Change Github" v-model="editable.github">
      <label for="floatingGithub">Github</label>
    </div>
    <div class="form-floating">
      <input type="url" class="form-control" id="floatingLinkedIn" placeholder="Change LinkedIn" v-model="editable.linkedin">
      <label for="floatingLinkedIn">LinkedIn</label>
    </div>
    <div class="form-floating">
      <input type="url" class="form-control" id="floatingResume" placeholder="Change Resume" v-model="editable.resume">
      <label for="floatingResume">Resume</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingClass" placeholder="Change Class" v-model="editable.class">
      <label for="floatingClass">Class</label>
    </div>
    <div class="d-flex gap-3 ms-2">
      <label for="graduated">Graduated?</label>
      <input type="checkbox" id="graduated" name="graduated" v-model="editable.graduated">
    </div>
    <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Save changes</button>
        </div>
  </form>


  
</template>

<script>
import { ref, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import { accountService } from "../services/AccountService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const editable = ref({})
    
    watchEffect(() => {
      editable.value = { ...AppState.account }
    })
    return {
      editable,
      async handleSubmit() {
        try {
          await accountService.editAccount(editable.value)
        }
        catch(error) {
          logger.log('[handleSubmit]', error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .form-floating {
    margin-bottom: 0.75rem;
  }
</style>