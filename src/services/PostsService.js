import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { sandboxApi } from "./AxiosService.js"

class PostsService {
  async getPosts() {
    const res = await sandboxApi.get("api/posts")
    // logger.log("res.data", res)
    AppState.posts = res.data.posts.map(data => new Post(data))
    AppState.nextPage = res.data.newer
    AppState.previousPage = res.data.older
    AppState.page = res.data.page
  }
}

export const postsService = new PostsService()