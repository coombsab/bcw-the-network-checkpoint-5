import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { sandboxApi } from "./AxiosService.js"

class ProfilesService {
  async getProfileById(profileId) {
    const res = await sandboxApi.get(`api/profiles/${profileId}`)
    AppState.activeProfile = new Profile(res.data)
  }
}

export const profilesService = new ProfilesService()