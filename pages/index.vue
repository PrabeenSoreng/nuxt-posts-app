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

export default {
  components: {
    Navbar,
    PostItem
  },
  data() {
    return {
      posts: [
        {
          _id: 1,
          title: "First Title",
          subtitle: "First Sub-title",
          isRead: true,
          createdAt: new Date()
        },
        {
          _id: 2,
          title: "Second Title",
          subtitle: "Second Sub-title",
          isRead: false,
          createdAt: new Date()
        }
      ]
    };
  }
};
</script>

<style></style>
