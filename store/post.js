import INITIAL_DATA from "./initial_data.json";
import Vue from "vue";

export function fetchPostsApi() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(INITIAL_DATA.posts);
    }, 2000);
  });
}

export const state = () => {
  return {
    items: []
  };
};

export const getters = {
  hasEmptyItems(state) {
    return state.items.length === 0;
  }
};

export const mutations = {
  setPosts(state, posts) {
    state.items = posts;
  },
  addPost(state, post) {
    state.items.push(post);
  },
  replacePost(state, { post, index }) {
    // state.items[index] = post;
    Vue.set(state.items, index, post);
  }
};

export const actions = {
  fetchPosts({ commit }) {
    return fetchPostsApi().then(posts => {
      commit("setPosts", posts);
    });
  },
  createPost({ commit }, postData) {
    postData._id = Math.random()
      .toString(36)
      .substr(2, 7);
    postData.isRead = false;
    postData.createdAt = new Date().getTime();

    return this.$axios.$post("/api/posts", postData).then(() => {
      commit("addPost", postData);
    });
  },
  updatePost({ commit, state }, postData) {
    const postIndex = state.items.findIndex(post => post._id === postData._id);
    if (postIndex !== -1)
      commit("replacePost", { post: postData, index: postIndex });
  }
};
