import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { IPost } from '../types/posts.types'
import { db } from '../config/firebase/baseConfig'
import { IProfile } from '../types/profile.types'

const getUserPosts = async (userID: string): Promise<IPost[]> => {
  const postsRef = collection(db, 'posts')

  try {
    const userPosts: IPost[] = []
    const res = query(postsRef, where('user.id', '==', userID))
    const querySnapshot = await getDocs(res)
    querySnapshot.forEach((doc) => {
      const posts = doc.data()
      userPosts.push(posts as IPost)
    })
    return userPosts
  } catch (err) {
    console.error(err)
    throw new Error()
  }
}

const getProfile = async (userID: string): Promise<IProfile> => {
  const profileRef = collection(db, 'profiles')

  try {
    const profiles: IProfile[] = []
    const res = query(profileRef, where('user_id', '==', userID))
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

const getPublicProfile = async (profileURL: string): Promise<IProfile> => {
  const profileRef = collection(db, 'profiles')

  try {
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

const postProfile = async (profile: IProfile) => {
  try {
    await addDoc(collection(db, 'profiles'), profile)
  } catch (err) {
    console.error(err)
  }
}

const putProfile = async (profile: IProfile) => {
  const docRef = collection(db, 'profiles')
  const res = query(docRef, where('user_id', '==', profile.user_id))
  const querySnapshot = await getDocs(res)
  const docID = querySnapshot.docs[0].id
  const profileRef = doc(db, 'profiles', docID)

  try {
    await updateDoc(profileRef, { ...profile })
  } catch (err) {
    console.error(err)
  }
}

export { getUserPosts, getProfile, getPublicProfile, postProfile, putProfile }
