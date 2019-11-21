import { INITIAL_DATA } from "./index.js";

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
    postData.createdAt = new Date();
    commit("addPost", postData);
  }
};
