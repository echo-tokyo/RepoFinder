import { configureStore } from '@reduxjs/toolkit'
import { reposApi } from './api/repos.api'

export const store = configureStore({
  reducer: {
    [reposApi.reducerPath]: reposApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reposApi.middleware),
})
