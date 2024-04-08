import { configureStore } from '@reduxjs/toolkit'
import userReducer from './auth/authSlice'
import userProfile from './profile/profileSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    profile: userProfile,
  },
})
