import { Button, Skeleton } from '@nextui-org/react'
import { useAuth } from '../../../hooks/auth/useAuth'
import ProfilePostsContainer from '../../containers/profile/profilePosts.container'
import ProfileCoverContainer from '../../containers/profile/profileCover.container'
import ProfileHeader from '../../components/profile/ProfileHeader'
import { Calendar } from '@icon-park/react'

const Profile: React.FC = () => {
  // Hooks
  const { user, isLoading, signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className='w-full'>
      <ProfileCoverContainer />
      <ProfileHeader />

      <Button color='primary' className='mx-auto mt-8 w-full'>
        <Calendar theme="outline" size="24" fill="#fff" strokeWidth={3}/>
        Pedir orçamento
      </Button>

      <ProfilePostsContainer />


      <div className='shadow-lg w-1/4 min-w-96 flex flex-col gap-10 p-8 rounded-sm'>
        {
          isLoading ? (
            <Skeleton className='h-14 w-full rounded-lg'/>
          ) : (
            <>
              <h1>Bem vindo(a) { user.email }</h1>
              <Button
                className='rounded-md'
                color='primary'
                size='lg'
                variant='light'
                onClick={handleLogout}
              >
                Deslogar
              </Button>
            </>
          )
        }
      </div>
    </div>
  )
}

export default Profile