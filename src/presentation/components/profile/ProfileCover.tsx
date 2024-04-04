import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import coverDefault from '/img/auth-bg-1.jpeg'
import { Pencil } from '@icon-park/react'
import useProfile from '../../../hooks/profile/useProfile'

interface IProfileCover {
  handleFiles: (files: FileList | null) => void
  previewFiles: string[]
  submitProfileCover: () => void
  isLoading: boolean
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const ProfileCover: React.FC<IProfileCover> = ({
  handleFiles,
  previewFiles,
  submitProfileCover,
  isLoading,
  isModalOpen,
  openModal,
  closeModal
}) => {
  // Hooks
  const {profile} = useProfile()

  return (
    <div className='w-full h-[100px]'>
      <div className='container container-left pt-4'>
        <Button
          className='bg-secondary text-white rounded-full absolute z-20'
          size='sm'
          onPress={openModal}
        >
          Editar capa
          <Pencil theme='outline' size='16' fill='#fff' strokeWidth={3}/>
        </Button>
      </div>
      <div className='w-screen h-[150px] bg-slate-500 text-white absolute top-0 left-0 overflow-hidden'>
        <img src={ profile.profile_cover || coverDefault} alt='' />
      </div>

      <Modal
        backdrop='blur'
        isOpen={isModalOpen}
        onClose={closeModal}
        placement='center'
      >
        <ModalContent>
          <ModalHeader >
            Escolha uma foto de capa para o seu perfil
          </ModalHeader>

          <ModalBody >
            <img src={previewFiles?.length > 0 ? previewFiles[0] : ''} alt="" />

            <label
              htmlFor='profile_cover'
              className='w-full block py-2 border-1 border-slate-400 hover:bg-slate-400 rounded-lg cursor-pointer text-center'
            >
              Selecionar imagem
            </label>

            <input
              type='file'
              name='profile_cover'
              id='profile_cover'
              className='hidden'
              onChange={e => handleFiles(e.target.files)}
            />
          </ModalBody>

          <ModalFooter >
            <Button
              color='primary'
              disabled={!(previewFiles?.length > 0)}
              onPress={submitProfileCover}
              isLoading={isLoading}
            >
              Salvar
            </Button>
            <Button onPress={closeModal}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ProfileCover