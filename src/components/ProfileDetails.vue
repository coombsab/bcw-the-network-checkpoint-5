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
    </div>
  </div>
</template>

<script>
import { Profile } from "../models/Profile.js";



export default {
  props: {
    profile: { type: Profile, required: true}
  },
  setup(props) {
    
    
    return {
      
    }
  }
}
</script>

<style scoped lang="scss">
  
</style>