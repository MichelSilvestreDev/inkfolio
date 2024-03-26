import { useSelector } from 'react-redux'
import { selectProfile } from '../../store/profile/profileSlice'

const useProfile = () => {
  const profile = useSelector(selectProfile)

  return {
    profile,
  }
}

export default useProfile
