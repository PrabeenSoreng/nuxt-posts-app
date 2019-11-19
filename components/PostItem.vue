<template>
  <div class="post">
    <a class="post-header post-header-link clickable">
      <h4 class="title is-4">{{ post.title }}</h4>
      <h5 class="subtitle is-5">{{ post.subtitle }}</h5>
    </a>
    <div class="post-content">
      by Filip Jerga, {{ post.createdAt | formatDate }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
  data() {
    return {};
  }
};
</script>
