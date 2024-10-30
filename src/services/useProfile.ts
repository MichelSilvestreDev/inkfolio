import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../config/firebase/baseConfig'
import { IProfile } from '../types/profile.types'
import { useDispatch, useSelector } from 'react-redux'
import { changeProfile, selectProfile } from '../store/profile/profileSlice'
import { selectUser } from '../store/auth/authSlice'
import { useState } from 'react'

const useProfile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const profile = useSelector(selectProfile)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const getProfile = async (userId: string): Promise<IProfile> => {
    setIsLoading(true)
    try {
      const profileRef = collection(db, 'profiles')
      const profiles: IProfile[] = []
      const res = query(profileRef, where('user_id', '==', userId))
      const querySnapshot = await getDocs(res)
      querySnapshot.forEach((doc) => {
        const profile = doc.data()
        profiles.push(profile as IProfile)
      })
      return profiles[0]
    } catch (err) {
      console.error(err)
      throw new Error()
    } finally {
      setIsLoading(false)
    }
  }

  const dispatchProfile = async (userId?: string): Promise<IProfile> => {
    try {
      const profileData = await getProfile(userId ?? user.uid)
      if (!profile) throw new Error()
      dispatch(changeProfile(profileData))
      return profileData
    } catch (err) {
      throw new Error('User profile not found')
    }
  }

  const getPublicProfile = async (profileURL: string): Promise<IProfile> => {
    try {
      const profileRef = collection(db, 'profiles')
      const profiles: IProfile[] = []
      const res = query(profileRef, where('profile_url', '==', profileURL))
      const querySnapshot = await getDocs(res)
      querySnapshot.forEach((doc) => {
        const profile = doc.data()
        profiles.push(profile as IProfile)
      })
      return profiles[0]
    } catch (err) {
      console.error(err)
      throw new Error()
    }
  }

  const createProfile = async (profile: IProfile) => {
    try {
      await addDoc(collection(db, 'profiles'), profile)
    } catch (err) {
      console.error(err)
      throw new Error()
    }
  }

  const updateProfile = async (profile: IProfile) => {
    try {
      const docRef = collection(db, 'profiles')
      const res = query(docRef, where('user_id', '==', profile.user_id))
      const querySnapshot = await getDocs(res)
      const docID = querySnapshot.docs[0].id
      const profileRef = doc(db, 'profiles', docID)

      await updateDoc(profileRef, { ...profile })
    } catch (err) {
      console.error(err)
      throw new Error()
    }
  }

  const updateProfileCover = async (profileCover: string) => {
    try {
      const profileData: IProfile = { ...profile, profile_cover: profileCover }
      await updateProfile(profileData)
      await getProfile(profile.user_id)
    } catch (err) {
      console.error(err)
      throw new Error()
    }
  }

  return {
    profile,
    isLoading,
    getProfile,
    getPublicProfile,
    dispatchProfile,
    createProfile,
    updateProfile,
    updateProfileCover,
  }
}

export default useProfile
