<template>
  <div class="post">
    <div class="post-content">
      <a class="post-header post-header-link clickable">
        <h4 class="title is-4">{{ post.title }}</h4>
        <h5 class="subtitle is-5">{{ post.subtitle }}</h5>
      </a>
      <div class="post-footer">
        by Filip Jerga, {{ post.createdAt | formatDate }}
      </div>
    </div>
    <div class="post-right">
      <label class="checkbox">
        <input @change="togglePost" type="checkbox" :checked="isArchived" />
        Read
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
  data() {
    return {};
  },
  computed: {
    archivedPosts() {
      return this.$store.state.post.archivedItems;
    },
    isArchived() {
      return this.archivedPosts.includes(this.post._id);
    }
  },
  methods: {
    togglePost() {
      this.$store.dispatch("post/toggleArchivedPosts", this.post._id);
    }
  }
};
</script>

<style scoped lang="scss">
.post {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  padding: 5px;
  border-bottom: 2px solid transparent;
  &:hover {
    border-bottom: 2px solid #e8e8e8;
  }
  &-content {
    flex: 1;
  }
  &-right {
    float: right;
    justify-content: flex-end;
    align-self: center;
  }
  &-footer {
    font-style: italic;
  }
}
</style>
