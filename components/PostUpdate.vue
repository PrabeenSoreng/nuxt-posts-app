<template>
  <form class="post-form">
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input
          class="input"
          type="text"
          v-model="post.title"
          placeholder="Awesome Title"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Subtitle</label>
      <div class="control">
        <input
          class="input"
          type="text"
          v-model="post.subtitle"
          placeholder="Awesome subtitle"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Content</label>
      <div class="control">
        <textarea
          class="textarea"
          v-model="post.content"
          placeholder="Awesome Content"
        ></textarea>
      </div>
    </div>
    <div class="markdown">
      <label for="" class="label">Content Preview</label>
      <div v-html="compiledMarkdown"></div>
    </div>
    <button @click.prevent="updatePost" class="button is-primary">
      Update
    </button>
  </form>
</template>

<script>
export default {
  props: ["postData"],
  data() {
    return {
      post: { ...this.postData }
    };
  },
  watch: {
    postData(data, oldValue) {
      this.post = { ...data };
    }
  },
  computed: {
    compiledMarkdown() {
      if (process.client) return marked(this.post.content, { sanitize: true });
      return "";
    }
  },
  methods: {
    updatePost() {
      this.$store.dispatch("post/updatePost", { ...this.post });
    }
  }
};
</script>
