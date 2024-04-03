import Header from '../../../common/Header';
import RegisterProfileContainer from '../../containers/profile/registerProfile.container';

const RegisterProfile = () => {
  return (
    <div className='w-full min-h-screen'>
      <Header
        title='Completar cadastro'
        subtitle='Complete seu cadastro para disponibilizar o seu perfil ao público.'
      />

      <div className="container">
        <RegisterProfileContainer />
      </div>
    </div>
  )
}

export default RegisterProfile;