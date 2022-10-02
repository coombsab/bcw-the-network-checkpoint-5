import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { sandboxApi } from "./AxiosService.js"

class PostsService {
  async getPosts(changePage = "", query = "") {
    AppState.posts = []
    AppState.page = null
    AppState.newer = null
    AppState.older = null
    if (!changePage) {
      changePage = "api/posts"
    }
    const res = await sandboxApi.get(changePage, {
      params: {
        query
      }
    })
    AppState.posts = res.data.posts.map(data => new Post(data))
    AppState.newer = res.data.newer
    AppState.older = res.data.older
    AppState.page = res.data.page
  }

  async getPostsByQuery(query) {
    AppState.posts = []
    AppState.page = null
    AppState.newer = null
    AppState.older = null
    const res = await sandboxApi.get("api/posts", {
      params: {
        query
      }
    })
    AppState.posts = res.data.posts.map(data => new Post(data))
    AppState.newer = res.data.newer
    AppState.older = res.data.older
    AppState.page = res.data.page
  }

  async createPost(formData) {
    // console.log("formData", formData)
    const res = await sandboxApi.post("api/posts", formData)
    AppState.posts = [new Post(res.data), ...AppState.posts]
  }

  async toggleLiked(postId) {
    let post = AppState.posts.find(p => p.id === postId)
    const postIndex = AppState.posts.indexOf(post)
    if (!post) {
      throw new Error("Cannot toggle liked as the post ID is not valid.")
    }
    const res = await sandboxApi.post(`api/posts/${postId}/like`)
    post = new Post(res.data)
    AppState.posts.splice(postIndex, 1, post)
  }

  async removePost(postId) {
    const post = AppState.posts.find(p => p.id === postId)
    if (!post) {
      throw new Error("Invalid Post ID.  Cannot find post to delete.")
    }
    await sandboxApi.delete(`api/posts/${postId}`)
    AppState.posts = AppState.posts.filter(p => p.id !== postId)
  }
}

export const postsService = new PostsService()