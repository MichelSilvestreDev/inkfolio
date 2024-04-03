import { Button, Chip, User } from '@nextui-org/react'
import useProfile from '../../../hooks/profile/useProfile'
import { Pencil } from '@icon-park/react'
import { Link } from 'react-router-dom'

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
          profile?.tattoo_styles?.split(',').map(style => 
            <Chip key={style} className='bg-tertiary text-white mr-4'>{style}</Chip>
          )
        }
      </div>

      <div className='w-full pb-8 flex justify-end'>
        <Link to='/completar-cadastro' className='absolute'>
          <Button className='bg-secondary text-white rounded-full z-20' size='sm'>
            Editar perfil
            <Pencil theme="outline" size="16" fill="#fff" strokeWidth={3}/>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default ProfileHeader