import PostsForm from "../../containers/post/PostsForm"

const NewPost: React.FC = () => {
  return (
    <div className="shadow-lg w-full flex flex-col gap-10 p-8 rounded-sm">
      <PostsForm />
    </div>
  )
}

export default NewPost