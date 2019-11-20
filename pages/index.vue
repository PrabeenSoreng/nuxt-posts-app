<template>
  <div>
    <Navbar />
    <div class="blogs-page">
      <div class="main-content">
        <div class="container">
          <div class="columns is-mobile">
            <div class="column is-8 is-offset-2">
              <div class="section">
                <div class="title">
                  <h1>Newest Posts</h1>
                  <hr />
                </div>
                <PostItem v-for="post in posts" :key="post._id" :post="post" />
              </div>
              <!-- end of post -->
            </div>
            <!-- end of side bar -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";
import PostItem from "~/components/PostItem.vue";
import { fetchPostsApi } from "~/store/post.js";

export default {
  components: {
    Navbar,
    PostItem
  },
  data() {
    return {};
  },
  fetch({ store }) {
    if (store.getters["post/hasEmptyItems"])
      return store.dispatch("post/fetchPosts");
  },
  // async asyncData() {
  //   const posts = await fetchPostsApi();
  //   return { posts };
  // }
  // mounted() {
  //   this.$store.dispatch("post/fetchPosts");
  // },
  computed: {
    posts() {
      return this.$store.state.post.items;
    }
  }
};
</script>

<style></style>
