import { Button } from '@nextui-org/react'
import coverDefault from '/img/auth-bg-1.jpeg'
import { Pencil } from '@icon-park/react'

const ProfileCover: React.FC = () => {
  return (
    <div className='w-full h-[100px]'>
      <div className="container container-left pt-4">
        <Button className='bg-secondary text-white rounded-full absolute z-20' size='sm'>
          Editar capa
          <Pencil theme="outline" size="16" fill="#fff" strokeWidth={3}/>
        </Button>
      </div>
      <div className='w-screen h-[150px] bg-slate-500 text-white absolute top-0 left-0 overflow-hidden'>
        <img src={coverDefault} alt="" />
      </div>
    </div>
  )
}

export default ProfileCover