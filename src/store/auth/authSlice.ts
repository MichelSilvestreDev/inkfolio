import { createSlice } from '@reduxjs/toolkit'

interface IUSer {
  userID: string
  userName: string
  isLogged: boolean
}

const initialState: IUSer = {
  userID: '',
  userName: '',
  isLogged: false,
}

export const slice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    changeUser(state, action) {
      return {
        ...state,
        isLogged: true,
        userID: action.payload.userID,
        userName: action.payload.userName,
      }
    },
    logout(state) {
      return {
        ...state,
        isLogged: false,
        userID: '',
        userName: '',
      }
    },
  },
})

export const { changeUser, logout } = slice.actions

export const selectUser = (state: { user: IUSer }) => state.user

export default slice.reducer
