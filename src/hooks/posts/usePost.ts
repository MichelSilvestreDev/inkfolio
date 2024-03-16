import { useEffect, useState } from 'react'
import { Post, PostFormValues } from '../../types/posts.types'
import { NewPostService, GetPostsService } from '../../services/postsService'

const usePost = () => {
  // States
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    if (posts.length < 1) getPosts()
  }, [posts])

  const getPosts = async () => {
    setIsLoading(true)
    await GetPostsService()
      .then((res) => {
        setPosts(res)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const newPost = async (post: PostFormValues) => {
    setIsLoading(true)
    const created: string = new Date().toISOString()

    post['created_at'] = created

    await NewPostService(post)
      .then((result) => {
        if (result) {
          console.log('Salvo com sucesso!')
        } else {
          console.log('Erro ao salvar')
        }
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return {
    posts,
    isLoading,
    newPost,
    getPosts,
  }
}

export default usePost
