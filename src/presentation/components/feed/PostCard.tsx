import { Button, Card, CardBody, CardFooter, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tooltip, User } from '@nextui-org/react'
import { IPost } from '../../../types/posts.types'
import { formatDate } from '../../../utils/formatDate'
import { Like, Message, More, SaveOne, ShareTwo } from '@icon-park/react'
import { convertToBRACurrency } from '../../../utils/convertToBRACurrency'
import PostImgSlide from './PostImgSlide'
import { Link } from 'react-router-dom'
import { Key } from 'react'
import PostContactBtn from './PostContactBtn'
import useProfile from '../../../hooks/profile/useProfile'
import { DiallingCodes } from '../../../types/enums/diallingCode.enum'

interface ICard {
  post: IPost,
  actions?: IAction
}

export interface IAction {
  label?: string
  options: IActionOption[]
}

export interface IActionOption {
  key: string
  label: string
  action: (params?: string) => Promise<void>
  color?: string
}

const PostCard: React.FC<ICard> = ({ post, actions }) => {
  const { profile } = useProfile()

  const handleAction = async (key: Key) => {
    const option = actions?.options.find(option => option.key === key)
    if(option && typeof(option.action) === 'function') await option.action(post.id)
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

        {
          actions && (
            <Dropdown>
              <DropdownTrigger>
                <Button variant='light' isIconOnly aria-label={actions.label || 'Mais'}>
                  <More theme='outline' size='24' fill='#333'/>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions" onAction={handleAction}>
                {
                  actions.options.map((option) => (
                    <DropdownItem key={option.key} >
                      { option.label }
                    </DropdownItem>
                  ))
                }
              </DropdownMenu>
            </Dropdown>
          )
        }
      </CardHeader>
      <CardBody className='relative overflow-visible px-0 '>
        <PostImgSlide urls={post.urls} />
        <div
          className="w-full h-18 z-20 px-4 py-3 rounded-b-lg absolute bottom-5 bg-white	  "
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
         <div style={{textAlign: 'end'}}>
            <PostContactBtn
              title={post.title}
              phone={`${DiallingCodes.Brazil}${profile?.phone}`}
            />
         </div>
        </div>
      </CardBody>
      <CardFooter className="gap-4 pt-8 px-0 relative z-20 hidden">
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