<template>
  <div class="card my-3 bg-theme-secondary elevation-2">
    <div class="card-header d-flex justify-content-between">
      <div class="d-flex align-items-center gap-4">
        <router-link :to="{ name: 'Profile', params: { id: post.creatorId }}">
          <img :src="post.creator.picture" :alt="post.creator.name" :title="post.creator.name" class="profile-img">
        </router-link>
        <div>
          <p>{{post.creator.name}}</p>
          <div class="d-flex gap-2 align-items-center text-less-important">
            <p :title="'Created at ' + new Date(post.createdAt)">{{getTime()}}</p>
            <div>
              <img src="../assets/img/Graduated.png" alt="Grad" class="grad-icon" v-if="post.creator.graduated">
            </div>
          </div>
        </div>
      </div>
      <div v-if="post.creator.id == account.id">
        <!-- TODO come back to popover after making search work -->
        <!-- <button type="button" class="btn" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Top popover">Popover</button> -->
        <!-- <img src="../assets/img/bi_three-dots.png" alt=""> -->
        <i class="mdi mdi-delete selectable" title="Delete Post" @click="removePost()"></i>
      </div>
    </div>
    <div class="card-body">
      <p>{{post.body}}</p>
      <img :src="post.imgUrl" alt="Image Not Loading" class="img-fluid rounded" v-if="post.imgUrl">
    </div>
    <div class="card-footer d-flex gap-2 justify-content-end align-items-center" v-if="account.id">
      <img src="../assets/img/ant-design_heart-outlined.png" alt="Like Icon" @click="toggleLiked()" class="selectable" title="Like Post" v-if="!isLiked()">
      <img src="../assets/img/ant-design_heart-filled.png" alt="Like Icon" @click="toggleLiked()" class="selectable" title="Unlike Post" v-else>      
      <p>{{post.likes.length}}</p>
    </div>
    <div class="card-footer d-flex gap-2 justify-content-end align-items-center" v-else>
      <img src="../assets/img/ant-design_heart-outlined.png" alt="Like Icon">
      <p>{{post.likes.length}}</p>
    </div>
  </div>
  
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { postsService } from "../services/PostsService.js";
import { profilesService } from "../services/ProfilesService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  props: {
    post: { type: Post, required: true }
  },
  setup(props, { emit }) {
    function getTime() {
      const today = new Date()
      const date = new Date(props.post.createdAt)
      let seconds = (today - date) / 1000
      const days = parseInt ( seconds / 86400 )
      seconds = seconds % 86400
      const hours = parseInt( seconds / 3600 )
      seconds = seconds % 3600
      const minutes = parseInt( seconds / 60 )
      seconds = parseInt(seconds % 60)
      let time

      if (days > 0) {
        time = days + "d"
      } else if (hours > 0) {
        time = hours + "h"
      } else if (minutes > 0) {
        time = minutes + "m"
      } else if (seconds > 0) {
        time = seconds + "s"
      }

      return time
    }

    return {
      getTime,
      account: computed(() => AppState.account),
      profile: computed(() => AppState.activeProfile),
      isLiked() {
        if (props.post.likeIds.find(id => id === this.account.id)) {
          // logger.log(true)
          return true
        } else {
          // logger.log(false)
          return false
        }
      },
      async toggleLiked() {
        try {
          await postsService.toggleLiked(props.post.id)
        }
        catch(error) {
          logger.log('[toggleLiked]', error)
          Pop.error(error.message)
        }
      },
      async removePost() {
        try {
          const yes = await Pop.confirm()
          if (!yes) {
            return
          }
          await postsService.removePost(props.post.id)
        }
        catch(error) {
          logger.log('[removePost]', error)
          Pop.error(error.message)
        }
      },
      async getProfileById() {
        try {
          await profilesService.getProfileById(props.post.creatorId)
        }
        catch(error) {
          logger.log('[getProfileById]', error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  p {
    margin: 0;
  }

  .profile-img {
    height: 3.44rem;
    width: 3.44rem;
    object-position: center;
    border-radius: 50%;
  }

  .grad-icon {
    height: 1.25rem;
    width: 1.25rem;
  }

  @media (min-width: 768px) {
    .profile-img {
      height: 5rem;
      width: 5rem;
      object-position: center;
      border-radius: 50%;
    }
  }
</style>