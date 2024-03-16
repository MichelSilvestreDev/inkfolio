import { collection, getDocs, query, where } from 'firebase/firestore'
import { Post } from '../types/posts.types'
import { db } from '../config/firebase/baseConfig'

const getUserPosts = async (userID: string): Promise<Post[]> => {
  const postsRef = collection(db, 'posts')

  try {
    const userPosts: Post[] = []
    const res = query(postsRef, where('user.id', '==', userID))
    const querySnapshot = await getDocs(res)
    querySnapshot.forEach((doc) => {
      const posts = doc.data()
      userPosts.push(posts as Post)
    })
    return userPosts
  } catch (err) {
    console.error(err)
    throw new Error()
  }
}

export { getUserPosts }
