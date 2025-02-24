import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRepo } from '../../types/repo'

const initialState:IRepo[] = []

export const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    updateRepos: (state, {payload}:PayloadAction<IRepo[]>) => {
      state.push(...payload)
    },
    resetRepos: () => {
      return []
    }
  }
})

export const { updateRepos, resetRepos } = reposSlice.actions;
export default reposSlice.reducer;