import PostsForm from '../../containers/post/PostsForm'

const NewPost: React.FC = () => {
  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center'>
      <div className='w-6/12 mx-auto'>
        <PostsForm />
      </div>
    </div>
  )
}

export default NewPost