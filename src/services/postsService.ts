import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase/baseConfig'
import { IPost, IPostFormValues } from '../types/posts.types'

export const NewPostService = async (newPost: IPostFormValues): Promise<IPost | boolean> => {
  try {
    await addDoc(collection(db, 'posts'), newPost)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

export const GetPostsService = async () => {
  const posts: IPost[] = []

  try {
    const querySnapshot = await getDocs(collection(db, 'posts'))

    querySnapshot.forEach((doc) => {
      const post = doc.data() as IPost
      posts.push(post)
    })
    return posts
  } catch (err) {
    console.error('Erro ao obter posts:', err)
    throw err
  }
}
