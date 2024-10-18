import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userID: "",
    userBlogs: [],
    userName: null,
    token: null,
    bio: null,
    profilePicture: null,
  },
  reducers: {
    setUser(state, action) {
      state.userBlogs = action.payload.userBlogs;
      state.userName = action.payload.userName;
      state.userID = action.payload.userID;
      state.token = action.payload.token;
      state.bio = action.payload.bio;
      state.profilePicture = action.payload.profilePicture;
    },
    clearUser(state) {
      state.userID = "";
      state.userBlogs = [];
      state.userName = null;
      state.token = null;
      state.bio = null;
      state.profilePicture = null;
    },
    updateSavedPosts(state, action) {
      if (state.userBlogs) {
        state.userBlogs = action.payload;
      }
    },
    updateUser(state, action) {
      const { userName, bio, profilePicture } = action.payload;
      if (userName !== undefined) {
        state.userName = userName;
      }
      if (bio !== undefined) {
        state.bio = bio;
      }
      if (profilePicture !== undefined) {
        state.profilePicture = profilePicture;
      }
    },
  },
});

export const { setUser, clearUser, updateSavedPosts, updateUser } =
  userSlice.actions;

export default userSlice.reducer;
