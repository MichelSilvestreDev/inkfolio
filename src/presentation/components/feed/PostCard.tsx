import { Button, Card, CardBody, CardFooter, CardHeader, Tooltip, User } from '@nextui-org/react'
import { IPost } from '../../../types/posts.types'
import { formatDate } from '../../../utils/formatDate'
import { Like, Message, SaveOne, ShareTwo } from '@icon-park/react'
import { convertToBRACurrency } from '../../../utils/convertToBRACurrency'
import PostImgSlide from './PostImgSlide'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IProfile } from '../../../types/profile.types'
import useProfile from '../../../hooks/profile/useProfile'

type Card = {
  post: IPost
}

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

const PostCard: React.FC<Card> = ({ post }: Card) => {
  const [profile, setProfile] = useState<IProfile>(initialState)
  const { getUserPublicProfile } = useProfile()

  useEffect(() => {
    if(post.user.profileUrl) {
      const getProfile = async () => {
        const profileData = await getUserPublicProfile(post.user.profileUrl)
        if(profileData) setProfile(profileData)
      }
      getProfile()
    }
  }, [post.user.profileUrl])
  
  const shareOnWhatsApp = () => {
    const message = `Olá! Acabei de encontrar uma tatuagem que me interessou muito no Inkfolio. É a ${post.title} com o valor de ${post.price}. Será que poderíamos conversar para discutir um orçamento? Fico no aguardo do seu retorno. Obrigado!`;


    const whatsappUrl = `https://api.whatsapp.com/send?phone=${profile.phone}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

  }

  return (
    <Card className='py-4 max-w-[500px] min-h-[650px] shadow-none mx-auto my-12 bg-transparent overflow-visible'>
      <CardHeader className='pb-0 pt-2 px-0 justify-between mb-4'>
        <Link to={`/perfil/${post.user.profileUrl}`}>
          <User
            name={post.user.name}
            description={formatDate(post.created_at, 'short')}
            avatarProps={{
              src: post.user.avatar
            }}
          />
        </Link>
      </CardHeader>
      <CardBody className='relative overflow-visible px-0 '>
        <PostImgSlide urls={post.urls} />
        <div
          className="w-full h-18 z-20 px-4 py-3 rounded-b-lg flex absolute bottom-5 bg-white	  "
        >
          <div className="w-full flex flex-grow gap-2 items-center">
            <div className="flex flex-col">
              <h3 ><strong>{post.title}</strong></h3>
              <p className="text-tiny ">{post.description}</p>
              {
                post.price && (
                  <p className="text-tiny  text-primary">{convertToBRACurrency(post.price)}</p>
                )
              }
            </div>
          </div>
         <div>
         <Tooltip content='Em breve' >
            <Button onClick={shareOnWhatsApp} radius="full" size="sm" className='mt-2 min-w-16 px-8'>Pedir orçamento</Button>
          </Tooltip>
         </div>
        </div>
      </CardBody>
      <CardFooter className="flex gap-4 pt-8 px-0 relative z-20 hidden">
        <Tooltip content='Em breve'>
          <div>
            <Like theme="outline" size="24" fill="#333" strokeWidth={3} className='cursor-pointer' />
          </div>
        </Tooltip>

        <Tooltip content='Em breve'>
          <div>
            <Message theme="outline" size="24" fill="#333" strokeWidth={3} className='cursor-pointer' />
          </div>
        </Tooltip>

        <Tooltip content='Em breve'>
          <div>
            <ShareTwo theme="outline" size="24" fill="#333" strokeWidth={3} className='cursor-pointer' />
          </div>
        </Tooltip>

        <Tooltip content='Em breve'>
          <div>
            <SaveOne theme="outline" size="24" fill="#333" strokeWidth={3} className='cursor-pointer' />
          </div>
        </Tooltip>
      </CardFooter>
    </Card>
  )
}

export default PostCard