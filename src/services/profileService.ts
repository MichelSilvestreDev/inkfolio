import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
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

const postProfile = async (profile: IProfile) => {
  try {
    const teste = await addDoc(collection(db, 'profiles'), profile)
    console.log(teste)
  } catch (err) {
    console.error(err)
  }
}

export { getUserPosts, getProfile, postProfile }
