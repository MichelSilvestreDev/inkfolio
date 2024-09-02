import { Button } from '@nextui-org/react'
// import { SocialMidiaEnum } from '../../../types/enums/socialMidiaEnum'
import { Behance, FacebookOne, Instagram, Youtube } from '@icon-park/react'
import useProfile from '../../../services/useProfile'

const SocialMidiaButtons: React.FC = () => {
  // Hooks
  const { profile } = useProfile()

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
      {
        profile.redes?.instagram && 
          <a href={profile.redes?.instagram} target='_blank'>
            <Button size='sm' variant='ghost' className='w-[120px]'>
              <Instagram theme="outline" size="16" fill="#333" strokeWidth={3}/>
              Instagram
            </Button>
          </a>
      }
      {
        profile.redes?.facebook && 
          <a href={profile.redes?.facebook} target='_blank'>
            <Button size='sm' variant='ghost' className='w-[120px]'>
              <FacebookOne theme="outline" size="16" fill="#333" strokeWidth={3}/>
              Facebook
            </Button>
          </a>
      }
      {
        profile.redes?.pinterest && 
          <a href={profile.redes?.pinterest} target='_blank'>
            <Button size='sm' variant='ghost' className='w-[120px]'>
              Pinterest
            </Button>
          </a>
      }
      {
        profile.redes?.linkedin && 
          <a href={profile.redes?.linkedin} target='_blank'>
            <Button size='sm' variant='ghost' className='w-[120px]'>
              Linkedin
            </Button>
          </a>
      }
      {
        profile.redes?.youtube && 
          <a href={profile.redes?.youtube} target='_blank'>
            <Button size='sm' variant='ghost' className='w-[120px]'>
              <Youtube theme="outline" size="24" fill="#333" strokeWidth={3}/>
              Youtube
            </Button>
          </a>
      }
      {
        profile.redes?.behance && 
          <a href={profile.redes?.behance} target='_blank'>
            <Button size='sm' variant='ghost' className='w-[120px]'>
              <Behance theme="outline" size="16" fill="#333" strokeWidth={3}/>
              Behance
            </Button>
          </a>
      }
    </div>
  )
}

export default SocialMidiaButtons