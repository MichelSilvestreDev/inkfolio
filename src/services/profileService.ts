import { collection, getDocs, query, where } from 'firebase/firestore'
import { IPost } from '../types/posts.types'
import { db } from '../config/firebase/baseConfig'

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

export { getUserPosts }
