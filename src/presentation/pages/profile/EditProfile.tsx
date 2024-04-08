import Header from "../../../common/Header";
import RegisterProfileContainer from "../../containers/profile/registerProfile.container";

const EditProfile = () => {
  return (
    <div className="w-full min-h-screen">
      <Header
        title='Editar perfil'
        subtitle='Mantenha o seu perfil atualizado.'
      />
      <div className="container">
        <RegisterProfileContainer />
      </div>
    </div>
  )
}

export default EditProfile;