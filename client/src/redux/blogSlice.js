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
    deletePostSuccess(state, action) {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
  },
});

// Action creators
export const {
  fetchBlogStart,
  fetchBlogSuccess,
  fetchBlogError,
  deletePostSuccess,
} = blogSlice.actions;

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

// Thunk for deleting a post
export const deletePostData = (postId) => (dispatch) => {
  fetch(`${import.meta.env.VITE_API_DOMAIN}/post/delete/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      dispatch(deletePostSuccess(postId));
    })
    .catch((error) => {
      console.error("Error deleting post:", error);
    });
};

// Selectors
export const getAllPosts = (state) => state.blog.posts;
export const getTaggedBlog = (state) => state.blog.taggedBlog;
export const getBlogLoadingState = (state) => state.blog.loading;
export const getBlogError = (state) => state.blog.error;

export default blogSlice.reducer;
