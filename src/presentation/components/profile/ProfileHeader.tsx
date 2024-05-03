import { Button, Chip, User } from '@nextui-org/react'
import { Eyes, Pencil } from '@icon-park/react'
import { Link } from 'react-router-dom'
import { IProfile } from '../../../types/profile.types'

interface IHeader {
  profile: IProfile
  canEdit?: boolean
}

const ProfileHeader: React.FC<IHeader> = ({profile, canEdit}) => {
  return (
    <div className='w-full rounded-lg bg-white p-8 flex flex-col gap-8 relative z-10 shadow-lg'>
      <div className='w-full flex justify-between items-center'>
        <User
          name={profile.name}
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
            <Chip key={style} size='sm' className='bg-tertiary text-white mr-4'>{style}</Chip>
          )
        }
      </div>

      {
        canEdit && (
          <div className='w-full pb-8 flex justify-center sm:justify-end gap-4'>
            <Link to={`/perfil/${profile.profile_url}`} target='_blank'>
              <Button className='bg-primary text-white rounded-full z-20' variant='shadow' size='sm'>
                <Eyes theme="outline" size="24" fill="#fff" strokeWidth={3}/>
                Visualizar perfil
              </Button>
            </Link>
            <Link to='/editar-perfil'>
              <Button className='bg-secondary text-white rounded-full z-20' variant='shadow' size='sm'>
                <Pencil theme="outline" size="16" fill="#fff" strokeWidth={3}/>
                Editar perfil
              </Button>
            </Link>
          </div>
        )
      }
    </div>
  )
}

export default ProfileHeader