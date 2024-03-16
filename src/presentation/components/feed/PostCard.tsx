import { Button, Card, CardBody, CardFooter, CardHeader, Tooltip, User } from '@nextui-org/react'
import { Post } from '../../../types/posts.types'
import { formatDate } from '../../../utils/formatDate'
import { Like, Message, SaveOne, ShareTwo } from '@icon-park/react'
import { convertToBRACurrency } from '../../../utils/convertToBRACurrency'
import PostImgSlide from './PostImgSlide'

type Card = {
  post: Post
}

const PostCard:React.FC<Card> = ({post}: Card) => {
  return (
    <Card className='py-4 max-w-[700px] min-h-[500px] shadow-none mx-auto my-12 bg-transparent overflow-visible'>
      <CardHeader className='pb-0 pt-2 px-0 justify-between mb-4'>
        <User
          name={post.user.email}
          description='InkFolio'
          avatarProps={{
            src: post.user.avatar
          }}
        />
        <p className='text-xs'>
          { formatDate(post.created_at, 'short') }
        </p>
      </CardHeader>
      <CardBody className='relative overflow-visible px-0 pb-0 mb-0'>
        <PostImgSlide urls={post.urls} />
        <div
          className="w-full h-16 z-50 px-4 rounded-b-xl flex absolute bottom-0 bg-black/40 border-t-1 border-default-600 dark:border-default-100"
        >
          <div className="w-full flex flex-grow gap-2 items-center">
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">{ post.description }</p>
              {
                post.price && (
                  <p className="text-tiny text-white/60 text-primary">{ convertToBRACurrency(post.price) }</p>
                )
              }
            </div>
          </div>
          <Tooltip content='Em breve'>
            <Button radius="full" size="sm" className='mt-4 min-w-16'>Pedir orçamento</Button>
          </Tooltip>
        </div>
      </CardBody>
      <CardFooter className="flex gap-4 pt-8 px-0 relative z-20">
        <Tooltip content='Em breve'>
          <div>
            <Like theme="outline" size="24" fill="#333" strokeWidth={3} className='cursor-pointer'/>
          </div>
        </Tooltip>

        <Tooltip content='Em breve'>
          <div>
            <Message theme="outline" size="24" fill="#333" strokeWidth={3} className='cursor-pointer'/>
          </div>
        </Tooltip>

        <Tooltip content='Em breve'>
          <div>
            <ShareTwo theme="outline" size="24" fill="#333" strokeWidth={3} className='cursor-pointer'/>
          </div>
        </Tooltip>

        <Tooltip content='Em breve'>
          <div>
            <SaveOne theme="outline" size="24" fill="#333" strokeWidth={3} className='cursor-pointer'/>
          </div>
        </Tooltip>
      </CardFooter>
    </Card>
  )
}

export default PostCard