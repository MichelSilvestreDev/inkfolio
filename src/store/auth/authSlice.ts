import { createSlice } from '@reduxjs/toolkit'
import { IUserData } from '../../types/auth.types'

const initialState: IUserData = {
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

export const selectUser = (state: { user: IUserData }) => state.user

export default slice.reducer
