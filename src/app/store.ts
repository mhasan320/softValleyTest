import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../app/feature/useSlice'

export const store = configureStore({
  reducer: {
    userData : userSlice
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch