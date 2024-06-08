import { Button, Card, CardBody, CardFooter, CardHeader, Tooltip, User } from '@nextui-org/react'
import { IPost } from '../../../types/posts.types'
import { formatDate } from '../../../utils/formatDate'
import { Like, Message, SaveOne, ShareTwo } from '@icon-park/react'
import { convertToBRACurrency } from '../../../utils/convertToBRACurrency'
import PostImgSlide from './PostImgSlide'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import ConfirmModal from '../../../common/ConfirmModal'

type Card = {
  post: IPost,
  onDelete?: (postId: string) => Promise<void>
}

const PostCard: React.FC<Card> = ({ post, onDelete }: Card) => {
  // States
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  
  // const shareOnWhatsApp = () => {
  //   const message = `Olá! Acabei de encontrar uma tatuagem que me interessou muito no Inkfolio, chamada ${post.title}, Será que poderíamos conversar para discutir um orçamento? Fico no aguardo do seu retorno. Obrigado!`;

  //   const whatsappUrl = `https://api.whatsapp.com/send?phone=${profile.phone}&text=${encodeURIComponent(message)}`;
  //   window.open(whatsappUrl, '_blank');
  // }

  const handleDeletePost = async () => {
    if(onDelete && typeof(onDelete) === 'function') await onDelete(post.id)
    else console.error("The 'onDelete' should be a function")
  }

  // const query = useQuery("delete-post", handleDeletePost)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <Card className='py-4 max-w-[500px] min-h-[650px] shadow-none mx-auto my-12 bg-transparent overflow-visible'>
      <CardHeader className='pb-0 pt-2 px-0 justify-between mb-4'>
        <Link to={`/perfil/${post.user.profileUrl}`}>
          <User
            name={post.user.name}
            description={formatDate(post.created_at, 'short')}
            avatarProps={{
              src: post.user.avatar
            }}
          />
        </Link>
      </CardHeader>
      <CardBody className='relative overflow-visible px-0 '>
        <PostImgSlide urls={post.urls} />
        <div
          className="w-full h-18 z-20 px-4 py-3 rounded-b-lg absolute bottom-5 bg-white	  "
        >
          <div className="w-full flex flex-grow gap-2 items-center">
            <div className="flex flex-col">
              <h3 ><strong>{post.title}</strong></h3>
              <p className="text-tiny ">{post.description}</p>
              {
                post.price && (
                  <p className="text-tiny  text-primary">{convertToBRACurrency(post.price)}</p>
                )
              }
            </div>
          </div>
         <div style={{textAlign: 'end'}}>
            {/* <Button onClick={shareOnWhatsApp} radius="full" size="sm" className='mt-2 min-w-16 px-8' color='primary'>Pedir orçamento</Button> */}
            <Button onClick={handleOpenModal} radius='full' size='sm' className='mt-2 min-w-16 px-8'>Deletar</Button>
         </div>
        </div>
      </CardBody>
      <CardFooter className="gap-4 pt-8 px-0 relative z-20 hidden">
        <Tooltip content='Em breve'>
          <div>
            <Like theme="outline" size="24" fill="#333" strokeWidth={3} className='cursor-pointer' />
          </div>
        </Tooltip>

        <Tooltip content='Em breve'>
          <div>
            <Message theme="outline" size="24" fill="#333" strokeWidth={3} className='cursor-pointer' />
          </div>
        </Tooltip>

        <Tooltip content='Em breve'>
          <div>
            <ShareTwo theme="outline" size="24" fill="#333" strokeWidth={3} className='cursor-pointer' />
          </div>
        </Tooltip>

        <Tooltip content='Em breve'>
          <div>
            <SaveOne theme="outline" size="24" fill="#333" strokeWidth={3} className='cursor-pointer' />
          </div>
        </Tooltip>
      </CardFooter>

      <ConfirmModal
        title='Deseja apagar a postagem?'
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDeletePost}
        isDismissable
      >
        <p>Após apagar a postagem não será possível recuperá-la</p>
      </ConfirmModal>
    </Card>
  )
}

export default PostCard