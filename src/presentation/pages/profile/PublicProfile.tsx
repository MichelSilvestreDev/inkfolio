import { Button } from '@nextui-org/react'
import ProfilePostsContainer from '../../containers/profile/profilePosts.container'
import ProfileCoverContainer from '../../containers/profile/profileCover.container'
import ProfileHeader from '../../components/profile/ProfileHeader'
import { Calendar } from '@icon-park/react'
import { useParams } from 'react-router-dom'
import useProfile from '../../../services/useProfile'
import { useQuery } from '@tanstack/react-query'
import ALertMessage from '../../../common/AlertMessage'
import Loader from '../../../common/Loader'

const PublicProfile: React.FC = () => {
  // Hooks
  const {profile_url} = useParams()
  const { getPublicProfile } = useProfile()
  const { data: profile, isError, isLoading } = useQuery({
    queryKey: ['publicProfile'],
    queryFn: () => getPublicProfile(profile_url ?? ''),
    enabled: !!profile_url
  })

  const shareOnWhatsApp = () => {
    const message = `Olá! Acabei de encontrar seu perfil no Inkfolio. Será que poderíamos conversar para discutir um orçamento? Fico no aguardo do seu retorno. Obrigado!`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${profile?.phone}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  if(isLoading) {
    return (
      <Loader />
    )
  }

  if(isError || !profile) {
    return (
      <ALertMessage
        message='Ocorreu um erro ao carregar os posts'
        status='error'
      />
    )
  }

  return (
    <div className='w-full'>
      <ProfileCoverContainer profile={profile} />
      <div className="container" style={{paddingBottom: '24px'}}>
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