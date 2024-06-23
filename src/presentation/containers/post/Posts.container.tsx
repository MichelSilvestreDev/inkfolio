import { useEffect, useState } from 'react'
import { IPostFormValues, IPostUser } from '../../../types/posts.types'
import useUploadFile from '../../../hooks/posts/useUploadFile'
import PostForm from '../../components/posts/PostForm'
import PostFilesForm from '../../components/posts/PostFilesForm'
import PreviewFiles from '../../components/posts/PreviewFiles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import useNotification from '../../../hooks/common/useNotification'
import { useAuth } from '../../../hooks/auth/useAuth'
import useProfile from '../../../hooks/profile/useProfile'
import { Button } from '@nextui-org/react'
import usePosts from '../../../services/usePosts'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const initialValues:IPostFormValues = {
  title: '',
  avaliable_negociation: false,
  discount: 0,
  description: '',
  styles: [],
  urls: [],
  created_at: '',
}

interface IContainer {
  closeModal: () => void
}

enum NewPostSteps {
  STEP1 = 'image',
  STEP2 = 'form'
}

const PostContainer: React.FC<IContainer> = ({ closeModal }: IContainer) => {
  // Hooks
  const { user } = useAuth()
  const { profile } = useProfile()
  const { createPost } = usePosts()
  const { isLoading: uploading, uploadFiles } = useUploadFile()
  const {successMessage, errorMessage} = useNotification()
  // States
  const [formData, setFormData] = useState(initialValues)
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [previewFiles, setPreviewFiles] = useState<string[]>([])
  const [formStep, setFormStep] = useState<NewPostSteps.STEP1 | NewPostSteps.STEP2>(NewPostSteps.STEP1)
  const postMutation = useMutation({
    mutationFn: (newPost: IPostFormValues) => createPost(newPost)
  })
  const queryClient = useQueryClient()

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

  const handleFiles = (files: FileList | null) => {
    if (files) {
      setSelectedFiles(files)
    }
  }

  const createFileList = (files: File[]): FileList => {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => {
      dataTransfer.items.add(file);
    });
    return dataTransfer.files;
  };

  const removeFile = (index: number) => {
    if (selectedFiles) {
      const updatedSelectedFiles = Array.from(selectedFiles);
      updatedSelectedFiles.splice(index, 1);
      setSelectedFiles(createFileList(updatedSelectedFiles));

      const updatedPreviewFiles = [...previewFiles];
      updatedPreviewFiles.splice(index, 1);
      setPreviewFiles(updatedPreviewFiles);
    }
  };
  const handleInputChange = (fieldName: string, value: string | number | string[] | boolean) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const urls = selectedFiles ? await uploadFiles(selectedFiles) : [];
      
      if (urls.length > 0) {
        const postUser: IPostUser = {
          id: user.uid,
          email: user.email || '',
          name: profile.name || '',
          avatar: profile.avatar || '',
          profileUrl: profile.profile_url
        }
        
        const post = Object.assign(formData, {user: postUser, urls: urls})

        // Submit the post
        await submitPost(post);
      } else {
        errorMessage('Adicione ao menos uma imagem');
      }
    } catch (error) {
      console.error('Error handling file uploads:', error);
      errorMessage('Ocorreu um erro inesperado ao enviar as imagens, tente novamente mais tarde');
    }
  };

  const submitPost = async (post: IPostFormValues) => {

    try {
      postMutation.mutate(post);
      successMessage('Post publicado com sucesso!');
      setTimeout(() => {
        closeModal();
        queryClient.invalidateQueries({ queryKey: ['userPosts'] })
      }, 1000);
    } catch (error) {
      console.error('Error submitting post:', error);
      errorMessage('Ocorreu um erro inesperado, tente novamente mais tarde');
    }
  };

  const handleStep = (step: string) => {
    if(step === 'form') {
      selectedFiles && selectedFiles.length > 0 &&
      setFormStep(NewPostSteps.STEP2)
    }
    
    if(step === 'image') {
      setFormStep(NewPostSteps.STEP1)
    }
  }

  return (
    <div>
      <ToastContainer />
      {
        selectedFiles && selectedFiles?.length > 0 ? (
          <div className='flex flex-col gap-4'>
            {
              formStep === 'image' && (
                <>
                  <PreviewFiles
                    previewFiles={previewFiles}
                    removeFile={removeFile}
                  />
                  <Button
                    onClick={() => handleStep(NewPostSteps.STEP2)}
                    color='secondary'
                    className='w-fit'
                  >
                    Continuar
                  </Button>
                </>
              )
            }
            {
              formStep === 'form' && (
                <>
                  <PostForm
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    setSelectedFiles={setSelectedFiles}
                    posting={uploading || postMutation.isPending}
                  />

                  <Button
                    onClick={() => handleStep(NewPostSteps.STEP1)}
                    color='secondary'
                    className='w-fit'
                  >
                    Voltar
                  </Button>
                </>
              )
            }
          </div>
        ) : (
          <PostFilesForm
            handleFiles={handleFiles}
          />
        )
      }
    </div>
  )
}

export default PostContainer