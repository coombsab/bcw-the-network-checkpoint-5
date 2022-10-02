import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { Profile } from "../models/Profile.js"
import { sandboxApi } from "./AxiosService.js"

class ProfilesService {
  async getProfileById(profileId) {
    AppState.activeProfile = null
    const res = await sandboxApi.get(`api/profiles/${profileId}`)
    AppState.activeProfile = new Profile(res.data)
  }

  async getPostsByProfileId(changePage = "", profileId) {
    AppState.posts = []
    AppState.page = null
    AppState.newer = null
    AppState.older = null
    if (!changePage) {
      changePage = `api/profiles/${profileId}/posts`
    }
    const res = await sandboxApi.get(changePage)
    // console.log(res.data)
    AppState.posts = res.data.posts.map(data => new Post(data))
    AppState.newer = res.data.newer
    AppState.older = res.data.older
    AppState.page = res.data.page
  }
}

export const profilesService = new ProfilesService()