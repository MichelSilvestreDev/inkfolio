import { useEffect, useState } from 'react'
import usePost from '../../../hooks/posts/usePost'
import { IPost } from '../../../types/posts.types'
import PostCard from '../../components/feed/PostCard'
import tattooStyles from '../../../assets/data/tattooStyles'
import CardSkeleton from '../../components/feed/CardSkeleton'
import { Button } from '@nextui-org/react'
import { Link } from 'react-router-dom'

interface IFeed {
  tattooStyle: string
}

const FeedByStyleContainer: React.FC<IFeed> = ({tattooStyle}) => {
  // Hooks
  const { getPostsByStyle, isLoading } = usePost()
  // States
  const [posts, setPosts] = useState<IPost[]>()

  const style = tattooStyles.find(e => e.url === tattooStyle)

  useEffect(() => {
    if(style) {
      (async () => {
        const postsData = await getPostsByStyle(style.value)
        setPosts(postsData)
      })()
    }
  },[style])

  if(isLoading) {
    return (
      <CardSkeleton />
    )
  }

  if(!isLoading && posts && posts?.length < 1) {
    return (
      <div className='py-16 flex flex-col justify-center items-center'>
        <h1 className='text-center text-2xl font-bold mb-2'>Parece que ainda não temos publicações nesse estilo</h1>
        <p className='mb-8'>Não se preocupe, navegue pela plataforma e descubra novos estilos</p>
        <Link to='/'>
          <Button color='primary' size='lg'>
            Voltar para a home
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className='mt-8'>
        <h1 className='text-2xl font-bold mb-4'>{ style?.name }</h1>
        <p>{ style?.description }</p>
      </div>
      {
        posts?.map(post => {
          return (
            <PostCard key={post.id} post={post} />
          )
        })
      }
    </div>
  )
}

export default FeedByStyleContainer