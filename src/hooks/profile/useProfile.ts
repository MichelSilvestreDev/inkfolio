import { useDispatch, useSelector } from 'react-redux'
import { changeProfile, selectProfile } from '../../store/profile/profileSlice'
import { getProfile, postProfile, putProfile } from '../../services/profileService'
import { IProfile } from '../../types/profile.types'
import { useState } from 'react'
import { useAuth } from '../auth/useAuth'

const useProfile = () => {
  // Hooks
  const { user } = useAuth()
  const profile = useSelector(selectProfile)
  const dispatch = useDispatch()
  // States
  const [isLoading, setIsLoading] = useState(false)

  const registerProfile = async (profile: IProfile) => {
    setIsLoading(true)
    try {
      await postProfile(profile)
        .then(async () => {
          const profileData = await getProfile(user.uid)
          dispatch(changeProfile(profileData))
        })
        .catch(() => {
          console.error('Ocorreu um erro ao buscar os perfis')
        })
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const getUserProfile = async (userID: string) => {
    setIsLoading(true)
    try {
      const profileData = await getProfile(userID)
      dispatch(changeProfile(profileData))
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const editProfile = async (profile: IProfile) => {
    setIsLoading(true)
    try {
      await putProfile(profile)
      await getUserProfile(profile.user_id)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const editProfileCover = async (profileCover: string) => {
    setIsLoading(true)
    const profileData: IProfile = { ...profile, profile_cover: profileCover }

    try {
      await putProfile(profileData)
      await getUserProfile(profile.user_id)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    profile,
    getUserProfile,
    registerProfile,
    editProfile,
    editProfileCover,
  }
}

export default useProfile
