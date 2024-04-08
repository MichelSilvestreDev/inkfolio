import { Picture } from '@icon-park/react'
import FeedContainer from '../containers/feed/Feed.container'
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react'
import PostContainer from '../containers/post/Posts.container'

const Feed: React.FC = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const closeModal = () => {
    onOpenChange()
  }

  return (
    <div className='w-full pt-16'>
      <div
        className='flex gap-4 mx-auto w-full max-w-[700px] border-2 border-red-400 text-primary border-dashed rounded-2xl p-8 items-center justify-center cursor-pointer'
        onClick={onOpen}
      >
        <Picture theme='outline' size='24' fill='#e03f5c' strokeWidth={3}/>
        <p>Adicionar Tatuagem</p>
      </div>

      <FeedContainer />

      <Modal
        backdrop='blur' 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        size='4xl'
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Adicionar Tatuagem</ModalHeader>
              <ModalBody>
                <PostContainer closeModal={closeModal}/>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Feed