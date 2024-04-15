import { Button, Chip, User } from '@nextui-org/react'
import { Pencil } from '@icon-park/react'
import { Link } from 'react-router-dom'
import { IProfile } from '../../../types/profile.types'

interface IHeader {
  profile: IProfile
  canEdit?: boolean
}

const ProfileHeader: React.FC<IHeader> = ({profile, canEdit}) => {
  return (
    <div className='w-full rounded-lg bg-white p-8 flex flex-col gap-8 relative z-10'>
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
            <Chip key={style} className='bg-tertiary text-white mr-4'>{style}</Chip>
          )
        }
      </div>

      {
        canEdit && (
          <div className='w-full pb-8 flex justify-end'>
            <Link to='/editar-perfil' className='absolute'>
              <Button className='bg-secondary text-white rounded-full z-20' size='sm'>
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