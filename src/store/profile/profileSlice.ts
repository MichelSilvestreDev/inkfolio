import { createSlice } from '@reduxjs/toolkit'
import { IProfile } from '../../types/profile.types'

const initialState: IProfile = {
  user_id: '',
  name: '',
  phone: '',
  bio: '',
  tattoo_styles: '',
  avatar: '',
  address: '',
  profile_cover: '',
  redes: '',
}

export const slice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    changeProfile(state, { payload }) {
      return {
        ...state,
        user_id: payload.user_id,
        name: payload.name,
        phone: payload.phone,
        bio: payload.bio,
        tattoo_styles: payload.tattoo_styles,
        avatar: payload.avatar,
        address: payload.address,
        profile_cover: payload.profile_cover,
        redes: payload.redes,
      }
    },
    removeProfile() {
      return {
        ...initialState,
      }
    },
  },
})

export const { changeProfile, removeProfile } = slice.actions

export const selectProfile = (state: { profile: IProfile }) => state.profile

export default slice.reducer
