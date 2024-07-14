import ProfilePostsContainer from '../../containers/profile/profilePosts.container'
import ProfileCoverContainer from '../../containers/profile/profileCover.container'
import ProfileHeader from '../../components/profile/ProfileHeader'
import useProfile from '../../../services/useProfile'
import useAuth from '../../../services/useAuth'

const Profile: React.FC = () => {
  // Hooks
  const { user } = useAuth()
  const {profile} = useProfile()

  return (
    <div className='w-full'>
      <ProfileCoverContainer profile={profile} canEdit/>
      <div className="container">
        <ProfileHeader profile={profile} canEdit/>
        <ProfilePostsContainer userID={user.uid} canEdit/>
      </div>
    </div>
  )
}

export default Profile