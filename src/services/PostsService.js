import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { sandboxApi } from "./AxiosService.js"

class PostsService {
  async getPosts(changePage = "api/posts") {
    const res = await sandboxApi.get(changePage)
    AppState.posts = res.data.posts.map(data => new Post(data))
    AppState.nextPage = res.data.newer
    AppState.previousPage = res.data.older
    AppState.page = res.data.page
  }

  async createPost(formData) {
    console.log("formData", formData)
    const res = await sandboxApi.post("api/posts", formData)
    AppState.posts = [new Post(res.data), ...AppState.posts]
  }
}

export const postsService = new PostsService()