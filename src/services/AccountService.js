import { AppState } from '../AppState'
import { Account } from "../models/Account.js"
import { Profile } from "../models/Profile.js"
import { logger } from '../utils/Logger'
import { sandboxApi } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await sandboxApi.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editAccount(formData) {
    // Leaving this commented out as it may be worth experimenting with later
    // AppState.account = []
    const res = await sandboxApi.put("/account", formData)
    AppState.account = new Account(res.data)
  }
}

export const accountService = new AccountService()
