import { useQuery } from '@tanstack/react-query';
import usePost from '../../../hooks/posts/usePost';
import CardSkeleton from '../../components/feed/CardSkeleton';
import PostCard from '../../components/feed/PostCard';
import ALertMessage from '../../../common/AlertMessage';

const FeedContainer: React.FC = () => {
  // Hooks
  const { getPosts } = usePost()
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  })

  if(isLoading) {
    return (
      <CardSkeleton />
    )
  }
  
  if(isError) {
    return (
      <ALertMessage
      message='Ocorreu um erro ao carregar os posts'
      status='error'
      />
    )
  }
  
  return (
    <div  className='container'>
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

export default FeedContainer;