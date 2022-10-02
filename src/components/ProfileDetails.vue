<template>
  <div class="card mt-3">
    <div class="card-header">
      {{profile.name}}
    </div>
    <div class="card-body">
      {{profile.body}}
    </div>
    <div class="card-footer">
      {{profile.email}}
      <button data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
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
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Account } from "../models/Account.js";
import { Profile } from "../models/Profile.js";
import AccountForm from "./AccountForm.vue";



export default {
    props: {
        profile: { type: Profile, required: true },
        account: { type: Account, required: true }
    },
    setup(props) {
        return {};
    },
    components: { AccountForm }
}
</script>

<style scoped lang="scss">
  
</style>