import usePost from '../../../hooks/posts/usePost';
import PostCard from '../../components/feed/PostCard';

const FeedContainer: React.FC = () => {
  // Hooks
  const { posts } = usePost()

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