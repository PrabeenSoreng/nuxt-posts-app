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
    items: [],
    archivedItems: []
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
  setArchivedPosts(state, archivedPosts) {
    state.archivedItems = archivedPosts;
  },
  addArchivedPosts(state, postId) {
    state.archivedItems.push(postId);
  },
  removeArchivedPosts(state, index) {
    state.archivedItems.splice(index, 1);
  },
  addPost(state, post) {
    state.items.push(post);
  },
  replacePost(state, { post, index }) {
    // state.items[index] = post;
    Vue.set(state.items, index, post);
  },
  discardPost(state, index) {
    state.items.splice(index, 1);
  }
};

export const actions = {
  fetchPosts({ commit }) {
    return this.$axios.$get("/api/posts").then(res => {
      commit("setPosts", res.posts);
    });
  },
  getArchivedPosts({ commit }) {
    const archivedPosts = localStorage.getItem("archived_posts");
    if (archivedPosts) {
      commit("setArchivedPosts", JSON.parse(archivedPosts));
    } else localStorage.setItem("archived_posts", JSON.stringify([]));
  },
  toggleArchivedPosts({ commit, state, dispatch }, postId) {
    if (state.archivedItems.includes(postId)) {
      // remove postId
      const index = state.archivedItems.findIndex(pId => pId == postId);
      commit("removeArchivedPosts", index);
      dispatch("persistArchivedPosts");
    } else {
      // add postId
      commit("addArchivedPosts", postId);
      dispatch("persistArchivedPosts");
    }
  },
  persistArchivedPosts({ state }) {
    localStorage.setItem("archived_posts", JSON.stringify(state.archivedItems));
  },
  createPost({ commit }, postData) {
    postData._id = Math.random()
      .toString(36)
      .substr(2, 7);
    postData.isRead = false;
    postData.createdAt = new Date().getTime();

    return this.$axios.$post("/api/posts", postData).then(res => {
      console.log(res);
      commit("addPost", postData);
    });
  },
  updatePost({ commit, state }, postData) {
    const postIndex = state.items.findIndex(post => post._id === postData._id);
    if (postIndex !== -1) {
      return this.$axios
        .$put(`/api/posts/${postData._id}`, postData)
        .then(res => {
          console.log(res);
          commit("replacePost", { post: postData, index: postIndex });
        });
    }
  },
  deletePost({ commit, state, dispatch }, postId) {
    const postIndex = state.items.findIndex(post => post._id === postId);
    if (postIndex !== -1) {
      return this.$axios.$delete(`/api/posts/${postId}`).then(res => {
        console.log(res);
        dispatch("toggleArchivedPosts", postId);
        commit("discardPost", postIndex);
      });
    }
  }
};
