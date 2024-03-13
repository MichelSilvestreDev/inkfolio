import { Card, CardBody, CardHeader, Image, User } from '@nextui-org/react'
import { Post } from '../../../types/posts.types'
import { formatDate } from '../../../utils/formatDate'

type Card = {
  post: Post
}

const PostCard:React.FC<Card> = ({post}: Card) => {
  return (
    <Card className='py-4 max-w-[700px] shadow-none mx-auto my-12 bg-transparent overflow-visible'>
      <CardHeader className='pb-0 pt-2 px-4 justify-between mb-4'>
        <User
          name={'user.email'}
          description='InkFolio'
          avatarProps={{
            src: 'https://i.pravatar.cc/150?u=a04258114e29026702d'
          }}
        />
        <p className='text-xs'>
          { formatDate(post.created_at, 'short') }
        </p>
      </CardHeader>
      <CardBody className='overflow-visible py-2'>
        <Image
          alt='Card background'
          className='object-cover rounded-xl'
          src={post?.urls[0]}
          isBlurred
        />

        <div className='mt-8'>
          <p>{ post.description }</p>
        </div>
      </CardBody>
    </Card>
  )
}

export default PostCard