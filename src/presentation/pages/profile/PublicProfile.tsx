import { Button } from '@nextui-org/react'
import ProfilePostsContainer from '../../containers/profile/profilePosts.container'
import ProfileCoverContainer from '../../containers/profile/profileCover.container'
import ProfileHeader from '../../components/profile/ProfileHeader'
import { Calendar } from '@icon-park/react'
import useProfile from '../../../hooks/profile/useProfile'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { initialState, IProfile } from '../../../types/profile.types'

const PublicProfile: React.FC = () => {
  // Hooks
  const {profile_url} = useParams()
  const { getUserPublicProfile, isLoading, isError } = useProfile()
  // States
  const [profile, setProfile] = useState<IProfile>(initialState)

  useEffect(() => {
    if(profile_url) {
      const getProfile = async () => {
        const profileData = await getUserPublicProfile(profile_url)
        if(profileData) setProfile(profileData)
      }
      getProfile()
    }
  }, [profile_url])

  const shareOnWhatsApp = () => {
    const message = `Olá! Acabei de encontrar seu perfil no Inkfolio. Será que poderíamos conversar para discutir um orçamento? Fico no aguardo do seu retorno. Obrigado!`;


    const whatsappUrl = `https://api.whatsapp.com/send?phone=${profile.phone}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

  }

  if(isLoading) {
    return (
      <p>Carregando.........</p>
    )
  }

  if(isError) {
    return (
      <p>Perfil não encontrado</p>
    )
  }

  return (
    <div className='w-full'>
      <ProfileCoverContainer profile={profile} />
      <div className="container">
        <ProfileHeader profile={profile}/>

        <Button color='primary' onClick={shareOnWhatsApp} className='mx-auto mt-8 max-w-[350px] w-full'>
          <Calendar theme="outline" size="24" fill="#fff" strokeWidth={3}/>
          Pedir orçamento
        </Button>

        <ProfilePostsContainer userID={profile.user_id} />
      </div>
    </div>
  )
}

export default PublicProfile