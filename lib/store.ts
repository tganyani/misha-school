import { configureStore } from '@reduxjs/toolkit'
import themeReducer from "@/lib/features/theme/themeSlice"
import { combineReducers } from 'redux';
import { persistReducer ,FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist'

  import storage from 'redux-persist/lib/storage'

  const reducers = combineReducers({
    theme:themeReducer
  });

  const persistConfig = {
    key: 'root',
    storage,
    // blacklist: ['']
  };
  const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch