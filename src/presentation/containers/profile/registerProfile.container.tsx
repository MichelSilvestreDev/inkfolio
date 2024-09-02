import { useEffect, useState } from 'react';
import ProfileForm from '../../components/profile/ProfileForm';
import { IProfile, initialState } from '../../../types/profile.types';
import useUploadFile from '../../../hooks/posts/useUploadFile';
import useNotification from '../../../hooks/common/useNotification';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Skeleton } from '@nextui-org/react';
import useProfile from '../../../services/useProfile';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../../../services/useAuth';

const RegisterProfileContainer: React.FC = () => {
  // Hooks
  const navigate = useNavigate()
  const { profile, createProfile, updateProfile } = useProfile()
  const createProfileMutate = useMutation({
    mutationFn: (profile: IProfile) => createProfile(profile)
  })
  const updateProfileMutate = useMutation({
    mutationFn: (profile: IProfile) => updateProfile(profile)
  })
  const {uploadFiles, isLoading: Uploading} = useUploadFile()
  const { user } = useAuth()
  const {successMessage, errorMessage} = useNotification()
  // States
  const [formData, setFormData] = useState(initialState)
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [previewFiles, setPreviewFiles] = useState<string[]>([])
  const [isLoadingProfile, setIsLoaginProfile] = useState(true)

  const handleFiles = (files: FileList | null) => {
    if(files) setSelectedFiles(files)
  }

  const handleInputChange = (fieldName: string, value: string | number | string[]) => {
    let updatedFormData = { ...formData };
    let fieldValue = value;
    if(fieldName === 'tattoo_styles' && typeof(value) === 'string') fieldValue = value?.replace(/^,/, "");
    // Verifica se o nome do campo contém um ponto para determinar se é um campo aninhado
    if (fieldName.includes('.')) {
      const [parentFieldName, nestedFieldName] = fieldName.split('.');
      updatedFormData = {
        ...updatedFormData,
        [parentFieldName]: {
          ...updatedFormData[parentFieldName],
          [nestedFieldName]: fieldValue,
        },
      };
    } else {
      updatedFormData = {
        ...updatedFormData,
        [fieldName]: fieldValue,
      };
    }
  
    setFormData(updatedFormData);
  };
  

  const submitProfile = async (profile: IProfile, isEditing?: boolean) => {
    const profileData:IProfile = {
      ...profile,
      user_id: user.uid,
      profile_cover: profile.profile_cover || ''
    }

    try {
      if(selectedFiles) {
        const uploadedUrls = await uploadFiles(selectedFiles);
        profileData.avatar = uploadedUrls[0];
      }

      if(isEditing) updateProfileMutate.mutate(profileData)
      else createProfileMutate.mutate(profileData)

      successMessage('Perfil salvo com sucesso!')
      setTimeout(() => {
        navigate('/perfil')
      }, 3000)
    } catch(err) {
      console.error('Erro ao cadastrar o perfil', err)
      errorMessage('Ocorreu um erro inesperado ao cadastrar o perfil')
    }
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
  }, [errorMessage, selectedFiles]);

  useEffect(() => {
    if(profile){
      setFormData(profile)
      setTimeout(() => {
        setIsLoaginProfile(false)
      }, 1000)
    }
  }, [profile])

  if(isLoadingProfile) return (
    <div className='bg-white rounded-lg flex flex-col gap-4 p-4 w-full max-w-[500px] shadow-lg mx-auto'>
      <Skeleton className='rounded-lg'>
        <div className='h-16 rounded-lg bg-default-300'></div>
      </Skeleton>
      <Skeleton className='rounded-lg'>
        <div className='h-16 rounded-lg bg-default-300'></div>
      </Skeleton>
      <Skeleton className='rounded-lg'>
        <div className='h-16 rounded-lg bg-default-300'></div>
      </Skeleton>
      <Skeleton className='rounded-lg'>
        <div className='h-16 rounded-lg bg-default-300'></div>
      </Skeleton>
      <Skeleton className='rounded-lg'>
        <div className='h-16 rounded-lg bg-default-300'></div>
      </Skeleton>
    </div>
  )

  return (
    <div>
      <ToastContainer />
      <ProfileForm
        isLoading={Uploading || createProfileMutate.isPending || updateProfileMutate.isPending}
        formValues={formData}
        previewFiles={previewFiles}
        handleFiles={handleFiles}
        handleInputChange={handleInputChange}
        submitProfile={submitProfile}
      />
    </div>
  )
}

export default RegisterProfileContainer;