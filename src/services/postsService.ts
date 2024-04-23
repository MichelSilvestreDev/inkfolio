import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../config/firebase/baseConfig'
import { IPost, IPostFormValues } from '../types/posts.types'

const NewPostService = async (newPost: IPostFormValues): Promise<IPost | boolean> => {
  try {
    await addDoc(collection(db, 'posts'), newPost)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

const GetPostsService = async () => {
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

const GetStylePostsService = async (tattooStyle: string): Promise<IPost[]> => {
  const postsRef = collection(db, 'posts')

  try {
    const posts: IPost[] = []
    const res = query(postsRef, where('styles', '==', tattooStyle))
    const querySnapshot = await getDocs(res)
    querySnapshot.forEach((doc) => {
      const postData = doc.data()
      console.log('aquii', posts)
      posts.push(postData as IPost)
    })
    return posts
  } catch (err) {
    console.error(err)
    throw new Error()
  }
}

export { NewPostService, GetPostsService, GetStylePostsService }
