import { configureStore } from '@reduxjs/toolkit'
import userReducer from './auth/authSlice'

export default configureStore({
  reducer: {
    user: userReducer,
  },
})
