import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase/baseConfig'
import { Post, PostFormValues } from '../types/posts.types'

export const NewPostService = async (newPost: PostFormValues): Promise<Post | boolean> => {
  try {
    await addDoc(collection(db, 'posts'), newPost)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

export const GetPostsService = async () => {
  const posts: Post[] = []

  try {
    const querySnapshot = await getDocs(collection(db, 'posts'))

    querySnapshot.forEach((doc) => {
      const post = doc.data() as Post
      posts.push(post)
    })
    return posts
  } catch (err) {
    console.error('Erro ao obter posts:', err)
    throw err
  }
}
