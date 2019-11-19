export const state = () => {
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
};

export const getters = () => {
  return {
    getPosts(state) {
      return state.posts;
    }
  };
};
