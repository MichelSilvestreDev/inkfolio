import { Chip, User } from '@nextui-org/react'
import useProfile from '../../../hooks/profile/useProfile'

const ProfileHeader: React.FC = () => {
  // Hooks
  const {profile} = useProfile()

  return (
    <div className='w-full rounded-lg bg-white p-8 flex flex-col gap-8 relative z-10'>
      <div className='w-full flex justify-between items-center'>
        <User
          name={profile.name}
          // description='Product Designer'
          avatarProps={{
            src: profile.avatar
          }}
        />

        <a href='' className='text-sm text-primary'>
          @{profile?.redes}
        </a>
      </div>

      <div>
        <h6 className='mb-4 text-bold'>{profile.address}</h6>
        <p>{ profile.bio }</p>
      </div>

      <div>
        {
          profile.tattoo_styles.split(',').map(style => 
            <Chip key={style} className='bg-tertiary text-white mr-4'>{style}</Chip>
          )
        }
      </div>
    </div>
  )
}

export default ProfileHeader