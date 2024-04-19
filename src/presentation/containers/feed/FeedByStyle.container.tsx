import { useEffect, useState } from 'react'
import usePost from '../../../hooks/posts/usePost'
import { IPost } from '../../../types/posts.types'
import PostCard from '../../components/feed/PostCard'
import tattooStyles from '../../../assets/data/tattooStyles'

interface IFeed {
  tattooStyle: string
}

const FeedByStyleContainer: React.FC<IFeed> = ({tattooStyle}) => {
  // Hooks
  const { getPostsByStyle } = usePost()
  // States
  const [posts, setPosts] = useState<IPost[]>()

  const style = tattooStyles.find(e => e.url === tattooStyle)

  useEffect(() => {
    (async () => {
      const postsData = await getPostsByStyle(tattooStyle)
      setPosts(postsData)
    })()
  },[])

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