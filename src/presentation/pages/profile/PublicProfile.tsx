import { Button } from '@nextui-org/react'
import ProfilePostsContainer from '../../containers/profile/profilePosts.container'
import ProfileCoverContainer from '../../containers/profile/profileCover.container'
import ProfileHeader from '../../components/profile/ProfileHeader'
import { Calendar } from '@icon-park/react'
import useProfile from '../../../hooks/profile/useProfile'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IProfile } from '../../../types/profile.types'

  const initialState: IProfile = {
    user_id: '',
    name: '',
    phone: '',
    bio: '',
    tattoo_styles: '',
    avatar: '',
    address: '',
    profile_cover: '',
    profile_url: '',
    redes: '',
  }

const PublicProfile: React.FC = () => {
  const [profile, setProfile] = useState<IProfile>(initialState)
  // Hooks
  const {profile_url} = useParams()
  const { getUserPublicProfile, isLoading, isError } = useProfile()

  useEffect(() => {
    if(profile_url) {
      const teste = async () => {
        const profileData = await getUserPublicProfile(profile_url)
        if(profileData) setProfile(profileData)
      }
      teste()
    }
  }, [profile_url])

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
      <ProfileHeader profile={profile}/>

      <Button color='primary' className='mx-auto mt-8 w-full'>
        <Calendar theme="outline" size="24" fill="#fff" strokeWidth={3}/>
        Pedir orçamento
      </Button>

      <ProfilePostsContainer />
    </div>
  )
}

export default PublicProfile