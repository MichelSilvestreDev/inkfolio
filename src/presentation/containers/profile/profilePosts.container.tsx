import { useEffect, useState } from "react"
import { getUserPosts } from "../../../services/profileService"
import { IPost } from "../../../types/posts.types"
import PostCard from "../../components/feed/PostCard"
import { useAuth } from "../../../hooks/auth/useAuth"

const ProfilePostsContainer:React.FC  = () => {
  // Hooks
  const { user } = useAuth()
  // States
  const [userPosts, setUserPosts] = useState<IPost[]>([])

  useEffect(() => {
    (async () => {
      const posts = await getUserPosts(user.uid)
      setUserPosts(posts)
    })()
  },[user.uid])

  return (
    <div className='w-full'>
      {
        userPosts.map(post => {
          return (
            <PostCard
              post={post}
              key={post.id}
  
            />
          )
        })
      }
    </div>
  )
}

export default ProfilePostsContainer