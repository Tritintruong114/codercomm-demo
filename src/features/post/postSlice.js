import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { POST_PER_PAGE } from "../../app/config";
const initialState = {
  isLoading: false,
  error: null,
  postsById: {},
  currentPagePosts: [],
};

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newPost = action.payload;
      if (state.currentPagePosts.length % POST_PER_PAGE === 0)
        state.currentPagePosts.pop();
      state.postsById[newPost._id] = newPost;
      state.currentPagePosts.unshift(newPost._id);
    },
    getPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, posts } = action.payload;
      posts.forEach((post) => {
        state.postsById[post._id] = post;
        if (!state.currentPagePosts.includes(post._id))
          state.currentPagePosts.push(post._id);
      });
      state.totalPosts = count;
    },
    sendPostReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      console.log(action.payload);
    },
  },
});
export const getPosts =
  ({ userId, page, limit = POST_PER_PAGE }) =>
  async (dispactch) => {
    dispactch(slice.actions.startLoading);
    try {
      const params = {
        page,
        limit,
      };

      const response = await apiService.get(`/posts/user/${userId}`, {
        params,
      });
      dispactch(slice.actions.getPostSuccess(response.data));
    } catch (error) {
      dispactch(slice.actions.hasError(error.message));
    }
  };
export const createPost =
  ({ content, image }) =>
  async (dispactch) => {
    dispactch(slice.actions.startLoading);
    try {
      const response = await apiService.post("/posts", {
        content,
        image,
      });
      dispactch(slice.actions.createPostSuccess(response.data));
    } catch (error) {
      dispactch(slice.actions.hasError(error.message));
    }
  };

export const sendPostReaction =
  ({ postId, emoji }) =>
  async (dispactch) => {
    dispactch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/reactions`, {
        targetType: "Post",
        targetId: postId,
        emoji,
      });
      dispactch(
        slice.actions.sendPostReactionSuccess({
          postId,
          reactions: response.data,
        })
      );
    } catch (error) {
      dispactch(slice.actions.hasError(error.message));
    }
  };
export default slice.reducer;
