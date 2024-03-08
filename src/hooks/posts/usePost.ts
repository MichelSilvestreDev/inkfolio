import { useState } from 'react'
import { PostFormValues } from '../../types/posts.types'
import { NewPostService } from '../../services/postsService'

const usePost = () => {
  // States
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
    isLoading,
    newPost,
  }
}

export default usePost
