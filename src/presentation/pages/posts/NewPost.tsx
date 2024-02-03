import PostContainer from '../../containers/post/Posts.container'

const NewPost: React.FC = () => {
  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center'>
      <div className='w-6/12 mx-auto'>
        <PostContainer />
      </div>
    </div>
  )
}

export default NewPost