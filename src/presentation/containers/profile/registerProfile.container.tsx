import { useState } from "react";
import ProfileForm from "../../components/profile/ProfileForm";
import { IProfile } from "../../../types/profile.types";
import useProfile from "../../../hooks/profile/useProfile";

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
  const { registerProfile, isLoading } = useProfile()
  // States
  const [formData, setFormData] = useState(initialValues)

  const handleInputChange = (fieldName: string, value: string | number | string[]) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const submitProfile = async (profile: IProfile) => {
    await registerProfile(profile)
  }

  return (
    <div>
      <ProfileForm
        formValues={formData}
        handleInputChange={handleInputChange}
        submitProfile={submitProfile}
      />
    </div>
  )
}

export default RegisterProfileContainer;