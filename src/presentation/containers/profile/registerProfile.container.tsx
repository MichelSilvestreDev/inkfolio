import { useState } from "react";
import ProfileForm from "../../components/profile/ProfileForm";
import { IProfile } from "../../../types/profile.types";

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
  // States
  const [formData, setFormData] = useState(initialValues)

  const handleInputChange = (fieldName: string, value: string | number | string[]) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  return (
    <div>
      <ProfileForm
        handleInputChange={handleInputChange}
      />
    </div>
  )
}

export default RegisterProfileContainer;