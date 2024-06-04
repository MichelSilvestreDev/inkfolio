import { useEffect, useState } from 'react'
import ProfileCover from '../../components/profile/ProfileCover'
import useProfile from '../../../hooks/profile/useProfile'
import useUploadFile from '../../../hooks/posts/useUploadFile'
import { ToastContainer } from 'react-toastify'
import useNotification from '../../../hooks/common/useNotification'
import 'react-toastify/dist/ReactToastify.css';
import { IProfile } from '../../../types/profile/profile.types'

interface IProfileCover {
  profile: IProfile
  canEdit?: boolean
}

const ProfileCoverContainer: React.FC<IProfileCover> = ({profile, canEdit}) => {
  // Hooks
  const { editProfileCover, isLoading } = useProfile()
  const { uploadFiles } = useUploadFile()
  const { successMessage, errorMessage } = useNotification()
  // States
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [previewFiles, setPreviewFiles] = useState<string[]>([])
  const [isMoadalOpen, setIsMoadalOpen] = useState<boolean>(false)

  const handleFiles = (files: FileList | null) => {
    if(files) setSelectedFiles(files)
  }

  const submitProfileCover = async () => {
    let coverUrl = '' 
    try {
      if(selectedFiles) {
        const uploadedUrls = await uploadFiles(selectedFiles);
        coverUrl = uploadedUrls[0];
      }

      await editProfileCover(coverUrl)
      successMessage('Imagem de capa salva com sucesso!')

      setTimeout(() => {
        closeModal()
      }, 2000)
    } catch(err) {
      console.error('Erro ao atualiza a imagem de capa do perfil', err)
      errorMessage('Ocorreu um erro inesperado, tente novamente mais tarde')
    }
  }

  const openModal = () => {
    setIsMoadalOpen(true)
  }

  const closeModal = () => {
    setIsMoadalOpen(false)
  }

  useEffect(() => {
    if (selectedFiles) {
      const previewPromises: Promise<string>[] = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const previewPromise = new Promise<string>((resolve, reject) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            resolve(reader.result as string);
          };

          reader.onerror = reject;

          reader.readAsDataURL(file);
        });

        previewPromises.push(previewPromise);
      }

      Promise.all(previewPromises)
        .then((previews) => {
          setPreviewFiles(previews);
        })
        .catch((error) => {
          console.error('Error creating image previews:', error);
          errorMessage('Ocorreu um erro no preview das imagens, tente novamente.');
        });
    }
  }, [selectedFiles]);

  return (
    <div>
      <ToastContainer />
      <ProfileCover
        handleFiles={handleFiles}
        previewFiles={previewFiles}
        submitProfileCover={submitProfileCover}
        isLoading={isLoading}
        isModalOpen={isMoadalOpen}
        openModal={openModal}
        closeModal={closeModal}
        profile={profile}
        canEdit={canEdit}
      />
    </div>
  )
}

export default ProfileCoverContainer