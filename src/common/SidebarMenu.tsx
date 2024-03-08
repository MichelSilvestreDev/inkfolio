import { AddFour, Calendar, Home, Message, Search, TipsOne } from "@icon-park/react"
import { Modal, ModalBody, ModalContent, ModalHeader, Skeleton, User, useDisclosure } from "@nextui-org/react"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/auth/useAuth"
import PostContainer from "../presentation/containers/post/Posts.container"

const SidebarMenu: React.FC = () => {
  // Hooks
  const { user, isLoading } = useAuth()
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const closeModal = () => {
    onOpenChange()
  }

  return (
    <>
      <nav className="w-full h-screen border-r border-gray-50 shadow-xl bg-white">
        <Link to='/' >
          <h1 className="text-2xl text-center font-bold mt-10 mb-12">InkFolio</h1>
        </Link>
        <ul className="px-4 flex flex-col gap-4">
          <Link to='/'>
            <li className="flex gap-4 h-11 items-center rounded-lg pl-4 hover:bg-gray-100 ease-linear duration-200">
              <Home theme="outline" size="24" fill="#333" strokeWidth={3}/>
              Página incial
            </li>
          </Link>
          <Link to='/'>
            <li className="flex gap-4 h-11 items-center rounded-lg pl-4 hover:bg-gray-100 ease-linear duration-200">
              <Message theme="outline" size="24" fill="#333" strokeWidth={3}/>
                Mensagens
            </li>
          </Link>
          <Link to='/'>
            <li className="flex gap-4 h-11 items-center rounded-lg pl-4 hover:bg-gray-100 ease-linear duration-200">
              <Calendar theme="outline" size="24" fill="#333" strokeWidth={3}/>
                Agenda
            </li>
          </Link>
          <li
            className="flex gap-4 h-11 items-center rounded-lg pl-4 hover:bg-gray-100 ease-linear duration-200 cursor-pointer"
            onClick={onOpen}
          >
            <AddFour theme="outline" size="24" fill="#333" strokeWidth={3}/>
            Criar
          </li>
          <Link to='/'>
            <li className="flex gap-4 h-11 items-center rounded-lg pl-4 hover:bg-gray-100 ease-linear duration-200">
              <TipsOne theme="outline" size="24" fill="#333" strokeWidth={3}/>
                Notificações
            </li>
          </Link>
          <Link to='/'>
            <li className="flex gap-4 h-11 items-center rounded-lg pl-4 hover:bg-gray-100 ease-linear duration-200">
              <Search theme="outline" size="24" fill="#333" strokeWidth={3}/>
                Pesquisar
            </li>
          </Link>
          { isLoading && (
            <div className="flex gap-3">
              <Skeleton className="h-10 w-10 rounded-full"/>
              <Skeleton className="h-10 w-44 rounded"/>
            </div>
          )}
          { !isLoading && (
            <Link to='/'>
              <User
                name={user.email}
                description="InkFolio"
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                }}
              />
            </Link>
          ) }
        </ul>
      </nav>

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
                <PostContainer closeModal={closeModal}/>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default SidebarMenu