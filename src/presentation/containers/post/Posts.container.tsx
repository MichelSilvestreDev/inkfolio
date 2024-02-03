import { useState } from 'react'
import { PostFormValues } from '../../../types/posts.types'
import usePost from '../../../hooks/posts/usePost'
import useUploadFile from '../../../hooks/posts/useUploadFile'
import PostForm from '../../components/posts/PostForm'
import PostFilesForm from '../../components/posts/PostFilesForm'

  const initialValues:PostFormValues = {
    user_id: '',
    description: '',
    styles: [],
    urls: [],
    created_at: '',
  }

// eslint-disable-next-line react-refresh/only-export-components
export const styles = [
    {
      label: 'Old School',
      value: 'old-school'
    },
    {
      label: 'New School',
      value: 'new-school'
    },
    {
      label: 'Tribal',
      value: 'tribal'
    },
    {
      label: 'Minimalista',
      value: 'minimalista'
    },
    {
      label: 'Realista',
      value: 'realista'
    },
  ]

const PostContainer: React.FC = () => {
  // Hooks
  const { isLoading: posting, newPost } = usePost()
  const { isLoading: uploading, upload } = useUploadFile()
  // States
  const [formData, setFormData] = useState(initialValues)
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)

  const handleFiles = (files: FileList | null) => {
    if(files) setSelectedFiles(files)
  }

  const handleInputChange = (fieldName: string, value: string | number | string[]) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    
    try {
      const uploadedFiles = await handleUploadFiles();
      
      if (uploadedFiles.length > 0) {    
        const post = Object.assign(formData)
        post['urls'] = uploadedFiles
        
        // Submit the post
        await submitPost(post);
      } else {
        window.alert('No files uploaded.');
      }
    } catch (error) {
      console.error('Error handling file uploads:', error);
      window.alert('Error handling file uploads.');
    }
  };

  const handleUploadFiles = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      return [];
    }

    const uploadedFiles:string[] = [];
    
    for (const file of selectedFiles) {
      try {
        const url = await upload(file);
        if(typeof(url) === 'string') uploadedFiles.push(url);
      } catch (error) {
        console.error('Error uploading file:', error);
        window.alert('Error uploading file.');
      }
    }

    return uploadedFiles;
  };

  const submitPost = async (post: PostFormValues) => {
    try {
      await newPost(post);
      window.alert('Cadastrado com sucesso!');
    } catch (error) {
      console.error('Error submitting post:', error);
      window.alert('Ocorreu um erro ao tentar salvar');
    }
  };

  return (
    <>
      {
        selectedFiles && selectedFiles?.length > 0 ? (
          <PostForm
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            setSelectedFiles={setSelectedFiles}
            posting={uploading || posting}
          />
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