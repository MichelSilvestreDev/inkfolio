import { useEffect, useState } from "react"
import { deleteUserPost, getUserPosts } from "../../../services/profileService"
import { IPost } from "../../../types/posts.types"
import PostCard, { IAction } from "../../components/feed/PostCard"
import ConfirmModal from "../../../common/ConfirmModal"

interface IProfilePosts {
  userID: string
}

const ProfilePostsContainer: React.FC<IProfilePosts>  = ({userID}) => {
  // States
  const [userPosts, setUserPosts] = useState<IPost[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [postId, setPostId] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      const posts = await getUserPosts(userID)
      setUserPosts(posts)
    })()
  },[userID])

  const actions: IAction = {
    options: [
      {
        key: 'delete',
        label: 'Apagar',
        action: async (postId?: string) => handleOpenModal(postId)
      },
    ]
  }

  const onDelete = async (postId: string) => {
    await deleteUserPost(postId)
  }

  const handleDeletePost = async () => {
    if(postId) await onDelete(postId)
    else console.error("The 'onDelete' should be a function")
  }

  const handleOpenModal = async (postId?: string) => {
    if(postId) {
      setPostId(postId)
      setIsModalOpen(true)
    }
  }
  
  const handleCloseModal = () => {
    setPostId(null)
    setIsModalOpen(false)
  }

  return (
    <div className='w-full'>
      {
        userPosts.map(post => {
          return (
            <PostCard
              post={post}
              actions={actions}
              key={post.id}
            />
          )
        })
      }

      <ConfirmModal
        title='Deseja apagar a postagem?'
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDeletePost}
        isDismissable
      >
        <p>Após apagar a postagem não será possível recuperá-la</p>
      </ConfirmModal>
    </div>
  )
}

export default ProfilePostsContainer