import { useSelector } from 'react-redux'
import { selectProfile } from '../../store/profile/profileSlice'
import { postProfile } from '../../services/profileService'
import { IProfile } from '../../types/profile.types'
import { useState } from 'react'

const useProfile = () => {
  // Hooks
  const profile = useSelector(selectProfile)
  // States
  const [isLoading, setIsLoading] = useState(false)

  const registerProfile = async (profile: IProfile) => {
    setIsLoading(true)
    try {
      await postProfile(profile)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    profile,
    registerProfile,
  }
}

export default useProfile
