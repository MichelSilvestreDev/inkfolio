import { useEffect, useState } from "react";
import ProfileForm from "../../components/profile/ProfileForm";
import { IProfile } from "../../../types/profile.types";
import useProfile from "../../../hooks/profile/useProfile";
import { useAuth } from "../../../hooks/auth/useAuth";
import useUploadFile from "../../../hooks/posts/useUploadFile";
import useNotification from "../../../hooks/common/useNotification";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const initialValues: IProfile = {
  user_id: '',
  name: '',
  phone: '',
  bio: '',
  tattoo_styles: [],
  avatar: '',
  address: '',
  redes: [],
}

const RegisterProfileContainer: React.FC = () => {
  // Hooks
  const navigate = useNavigate()
  const { registerProfile, isLoading: PostinProfile } = useProfile()
  const {uploadFiles, isLoading: Uploading} = useUploadFile()
  const { user } = useAuth()
  // States
  const [formData, setFormData] = useState(initialValues)
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [previewFiles, setPreviewFiles] = useState<string[]>([])
  const {successMessage, errorMessage} = useNotification()

  const handleFiles = (files: FileList | null) => {
    if(files) setSelectedFiles(files)
  }

  const handleInputChange = (fieldName: string, value: string | number | string[]) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const submitProfile = async (profile: IProfile) => {
    const profileData:IProfile = {...profile, user_id: user.uid}

    try {
      if(selectedFiles) {
        const uploadedUrls = await uploadFiles(selectedFiles);
        profileData.avatar = uploadedUrls[0];
      }

      await registerProfile(profileData);

      successMessage('Perfil cadastrado com sucesso!')
      setTimeout(() => {
        navigate('/perfil')
      }, 1500)
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

  return (
    <div>
      <ToastContainer />
      <ProfileForm
        isLoading={Uploading || PostinProfile}
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