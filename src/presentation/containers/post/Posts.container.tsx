import { useEffect, useState } from 'react'
import { IPostFormValues, IPostUser } from '../../../types/posts.types'
import usePost from '../../../hooks/posts/usePost'
import useUploadFile from '../../../hooks/posts/useUploadFile'
import PostForm from '../../components/posts/PostForm'
import PostFilesForm from '../../components/posts/PostFilesForm'
import PreviewFiles from '../../components/posts/PreviewFiles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import useNotification from '../../../hooks/common/useNotification'
import { useAuth } from '../../../hooks/auth/useAuth'
import useProfile from '../../../hooks/profile/useProfile'

const initialValues:IPostFormValues = {
  title: '',
  avaliable_negociation: false,
  discount: 0,
  description: '',
  styles: [],
  urls: [],
  created_at: '',
}

type Post = {
  closeModal: () => void
}

const PostContainer: React.FC<Post> = ({ closeModal }: Post) => {
  // Hooks
  const { user } = useAuth()
  const { profile } = useProfile()
  const { isLoading: posting, newPost } = usePost()
  const { isLoading: uploading, uploadFiles } = useUploadFile()
  const {successMessage, errorMessage} = useNotification()
  // States
  const [formData, setFormData] = useState(initialValues)
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [previewFiles, setPreviewFiles] = useState<string[]>([])

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
          name: user.displayName || '',
          avatar: user.photoUrl || '',
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
      await newPost(post);
      successMessage('Post publicado com sucesso!');
      setTimeout(() => {
        closeModal();
      }, 1000);
    } catch (error) {
      console.error('Error submitting post:', error);
      errorMessage('Ocorreu um erro inesperado, tente novamente mais tarde');
    }
  };

  return (
    <>
      <ToastContainer />
      {
        selectedFiles && selectedFiles?.length > 0 ? (
          <div className='grid grid-cols-2 gap-4'>
            <PreviewFiles
              previewFiles={previewFiles}
              removeFile={removeFile}
            />
            <PostForm
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
              setSelectedFiles={setSelectedFiles}
              posting={uploading || posting}
            />
          </div>
        ) : (
          <PostFilesForm
            handleFiles={handleFiles}
          />
        )
      }
    </>
  )
}

export default PostContainer