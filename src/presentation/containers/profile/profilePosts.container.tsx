import { useEffect, useState } from "react"
import { getUserPosts } from "../../../services/profileService"
import { IPost } from "../../../types/posts.types"
import PostCard from "../../components/feed/PostCard"

interface IProfilePosts {
  userID: string
}

const ProfilePostsContainer: React.FC<IProfilePosts>  = ({userID}) => {
  // States
  const [userPosts, setUserPosts] = useState<IPost[]>([])

  useEffect(() => {
    (async () => {
      const posts = await getUserPosts(userID)
      setUserPosts(posts)
    })()
  },[userID])

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