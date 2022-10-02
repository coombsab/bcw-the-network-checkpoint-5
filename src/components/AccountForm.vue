<template>
  <form @submit.prevent="">
    <input type="text" placeholder="I'm an account form!">
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
  
</style>