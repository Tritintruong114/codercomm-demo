import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
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
    },
  },
});

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

export default slice.reducer;
