import usePost from '../../../hooks/posts/usePost';
import CardSkeleton from '../../components/feed/CardSkeleton';
import PostCard from '../../components/feed/PostCard';

const FeedContainer: React.FC = () => {
  // Hooks
  const { posts, isLoading } = usePost()

  if(isLoading) {
    return (
      <CardSkeleton />
    )
  }

  return (
    <>
      {
        posts?.map(post => {
          return (
            <PostCard key={post.id} post={post} />
          )
        })
      }
    </>
  )
}

export default FeedContainer;