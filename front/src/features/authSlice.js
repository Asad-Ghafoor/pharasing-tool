import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user: null,
    refetch: false,
    state: true,
    upload: true,
    modalResponse: ""
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    setRefetch: (state, action) => {
      state.refetch = action.payload;
    },
    setUpload: (state, action) => {
      state.upload = action.payload;
    },
    setModalResponse: (state, action) => {
      state.modalResponse = action.payload;
    }

  },
});

const { actions, reducer } = authSlice;

export const { setLoading, setUser, setRefetch, setUpload, setModalResponse } = actions;

export default reducer;