import { configureStore } from '@reduxjs/toolkit'
import { reposApi } from './api/repos.api'
import reposReducer from './repos/repos.slice'

export const store = configureStore({
  reducer: {
    [reposApi.reducerPath]: reposApi.reducer,
    repos: reposReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reposApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>