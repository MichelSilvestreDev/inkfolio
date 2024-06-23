import { useState } from 'react'
import { deleteUserPost, getUserPosts } from '../../../services/profileService'
import PostCard, { IAction } from '../../components/feed/PostCard'
import ConfirmModal from '../../../common/ConfirmModal'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import calcMilliSeconds from '../../../utils/calcMilliSeconds'

interface IProfilePosts {
  userID: string
  canEdit?: boolean
}

const ProfilePostsContainer: React.FC<IProfilePosts>  = ({userID, canEdit}) => {
  // States
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [postId, setPostId] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const { data: userPosts } = useQuery({
    queryKey: ['userPosts', userID],
    queryFn: () => getUserPosts(userID),
    enabled: !!userID,
    staleTime: calcMilliSeconds(2)
  })

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
    queryClient.invalidateQueries({queryKey: ['userPosts']})
    handleCloseModal()
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
        userPosts?.map(post => {
          return (
            <PostCard
              post={post}
              actions={canEdit ? actions : undefined}
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