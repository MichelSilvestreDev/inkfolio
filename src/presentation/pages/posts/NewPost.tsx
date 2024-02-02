import PostContainer from '../../containers/post/Posts.container'
import UploadFileContainer from '../../containers/post/UploadFile.container'

const NewPost: React.FC = () => {
  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center'>
      <div className='w-6/12 mx-auto'>
        <UploadFileContainer />
        <PostContainer />
      </div>
    </div>
  )
}

export default NewPost