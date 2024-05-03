import { useCallback, useEffect, useState } from 'react'
import { IPost, IPostFormValues } from '../../types/posts.types'
import { NewPostService, GetPostsService, GetStylePostsService } from '../../services/postsService'

const usePost = () => {
  // States
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [posts, setPosts] = useState<IPost[]>([])

  const handleGetPosts = useCallback(async () => {
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
  }, [])

  useEffect(() => {
    handleGetPosts()
  }, [handleGetPosts])

  const getPostsByStyle = async (tattooStyle: string): Promise<IPost[]> => {
    setIsLoading(true)
    let posts: IPost[] = []
    await GetStylePostsService(tattooStyle)
      .then((res) => {
        posts = res
      })
      .catch((err) => {
        console.error(err)
        throw new Error()
      })
      .finally(() => {
        setIsLoading(false)
      })
    return posts
  }

  const newPost = async (post: IPostFormValues) => {
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
    getPosts: handleGetPosts,
    getPostsByStyle,
  }
}

export default usePost
