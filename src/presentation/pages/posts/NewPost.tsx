import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react'
import PostContainer from '../../containers/post/Posts.container'
import './post.styles.css'

const NewPost: React.FC = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center newpost-page'>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal 
        backdrop="blur" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        size='4xl'
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Criar nova publicação</ModalHeader>
              <ModalBody>
                <PostContainer />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default NewPost