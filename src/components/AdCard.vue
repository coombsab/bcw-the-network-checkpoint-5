<template>
  <div class="card mb-3">
    <img :src="ad.square" :alt="ad.title" :title="ad.title" class="rounded img-fluid">
  </div>  
</template>

<script>
import { Ad } from "../models/Ad.js";

export default {
  props: {
    ad: { type: Ad, required: true }
  },
  setup() {
    
    return {
      
    }
  }
}
</script>

<style scoped lang="scss">
  
</style>