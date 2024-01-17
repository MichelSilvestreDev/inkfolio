import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../types/auth.types'

const initialState: User = {
  uid: '',
  displayName: '',
  email: '',
  emailVerified: false,
  phoneNumber: '',
  photoUrl: '',
  isLogged: false,
}

export const slice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    changeUser(state, { payload }) {
      return {
        ...state,
        uid: payload.uid,
        displayName: payload.displayName,
        email: payload.email,
        emailVerified: payload.emailVerified,
        phoneNumber: payload.phoneNumber,
        photoUrl: payload.photoUrl,
        isLogged: true,
      }
    },
    logout() {
      return {
        ...initialState,
      }
    },
  },
})

export const { changeUser, logout } = slice.actions

export const selectUser = (state: { user: User }) => state.user

export default slice.reducer
