import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    posts: [],
    taggedBlog: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchBlogStart(state) {
      state.loading = true;
      state.error = null; // Clear any previous errors
    },
    fetchBlogSuccess(state, action) {
      state.loading = false;
      state.posts = action.payload.allPosts;

      const tagsArray = action.payload.allPosts.flatMap((post) => post.tags);
      const tagCounts = tagsArray.reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      }, {});

      state.taggedBlog = Object.entries(tagCounts).map(([tag, count]) => ({
        tag,
        count,
      }));
    },
    fetchBlogError(state, action) {
      state.loading = false;
      state.error = action.payload || "Failed to fetch blog data";
    },
  },
});

// Action creators
export const { fetchBlogStart, fetchBlogSuccess, fetchBlogError } =
  blogSlice.actions;

// Thunk for fetching blog data
export const fetchBlogData = () => (dispatch) => {
  dispatch(fetchBlogStart());

  fetch(`${import.meta.env.VITE_API_DOMAIN}/post/getblogpost`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch blog data");
      }
      return response.json();
    })
    .then((data) => {
      dispatch(fetchBlogSuccess(data));
    })
    .catch((error) => {
      dispatch(fetchBlogError(error.message));
    });
};

// Selectors
export const getAllPosts = (state) => state.blog.posts;
export const getTaggedBlog = (state) => state.blog.taggedBlog;
export const getBlogLoadingState = (state) => state.blog.loading;
export const getBlogError = (state) => state.blog.error;

export default blogSlice.reducer;
