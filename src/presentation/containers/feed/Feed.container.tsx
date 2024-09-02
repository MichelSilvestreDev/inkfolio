import { useQuery } from '@tanstack/react-query';
import CardSkeleton from '../../components/feed/CardSkeleton';
import PostCard from '../../components/feed/PostCard';
import ALertMessage from '../../../common/AlertMessage';
import usePosts from '../../../services/usePosts';
import { IPost } from '../../../types/posts.types';
import calcMilliSeconds from '../../../utils/calcMilliSeconds';

const FeedContainer: React.FC = () => {
  // Hooks
  const { getPosts } = usePosts()
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
    staleTime:  calcMilliSeconds(2)
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
        posts?.map((post: IPost) => {
          return (
            <PostCard key={post.id} post={post} />
          )
        })
      }
    </div>
  )
}

export default FeedContainer;