import { createSlice } from '@reduxjs/toolkit'
import { IProfile } from '../../types/profile/profile.types'
import { profileInitialState } from '../../types/profile/profileSchema'

export const slice = createSlice({
  name: 'profile',
  initialState: profileInitialState,
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
        profile_url: payload.profile_url,
        redes: payload.redes,
      }
    },
    removeProfile() {
      return {
        ...profileInitialState,
      }
    },
  },
})

export const { changeProfile, removeProfile } = slice.actions

export const selectProfile = (state: { profile: IProfile }) => state.profile

export default slice.reducer
