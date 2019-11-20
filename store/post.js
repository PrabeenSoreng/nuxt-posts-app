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
  }
};

export const actions = {
  fetchPosts({ commit }) {
    return fetchPostsApi().then(posts => {
      commit("setPosts", posts);
    });
  }
};
