import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import blogReducer from "./blogSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedBlogReducer = persistReducer(persistConfig, blogReducer); // Persist the blog reducer

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    blog: persistedBlogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
        ignoredPaths: ["user.someFunction"],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
