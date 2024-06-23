import {
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../config/firebase/baseConfig'
import { IPost, IPostFormValues } from '../types/posts.types'
import { IQueryParams } from '../types/query.types'

const usePosts = () => {
  const getPosts = async (params?: IQueryParams): Promise<IPost[]> => {
    try {
      const postsRef = collection(db, 'posts')
      const posts: IPost[] = []
      // const queryParams = params ? query(postsRef, where(params?.key, '==', params.value)) : null
      const querySnapshot = await getDocs(postsRef)

      querySnapshot.forEach((doc) => {
        const post = doc.data() as IPost
        console.log(post, 'aaaaaaaaaaaaaaaaaa')
        posts.push(post)
      })

      return posts
    } catch (err) {
      console.error('Erro ao obter posts:', err)
      throw new Error()
    }
  }

  const createPost = async (newPost: IPostFormValues): Promise<IPost> => {
    try {
      const created: string = new Date().toISOString()
      newPost['created_at'] = created

      const docRef: DocumentReference<DocumentData> = await addDoc(collection(db, 'posts'), newPost)
      const docSnap = await getDoc(docRef)

      // if (docSnap.exists()) {
      const post = docSnap.data() as IPost
      return post
      // }
    } catch (err) {
      console.error(err)
      throw new Error()
    }
  }

  return {
    getPosts,
    createPost,
  }
}

export default usePosts
