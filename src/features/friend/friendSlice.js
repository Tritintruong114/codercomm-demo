import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: null,
  error: null,
};

const slice = createSlice({
  name: "friend",
  initialState,
  reducers: {},
});

export default slice.reducer;
