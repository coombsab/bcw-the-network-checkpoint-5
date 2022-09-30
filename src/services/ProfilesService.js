import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { sandboxApi } from "./AxiosService.js"

class ProfilesService {
  async getProfileById(profileId) {
    const res = await sandboxApi.get(`api/profiles/${profileId}`)
    AppState.activeProfile = new Profile(res.data)
  }

  async getPostsByProfileId(profileId) {
    const res = await sandboxApi.get(`api/profiles/${profileId}/posts`)
    console.log(res.data)
    AppState.posts = res.data.posts.map(data => new Post(data))
    AppState.newer = res.data.newer
    AppState.older = res.data.older
    AppState.page = res.data.page
  }
}

export const profilesService = new ProfilesService()