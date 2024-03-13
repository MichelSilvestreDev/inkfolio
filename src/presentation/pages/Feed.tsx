import { Button, Skeleton } from "@nextui-org/react"
import { useAuth } from "../../hooks/auth/useAuth"
import FeedContainer from "../containers/feed/Feed.container"

const Feed: React.FC = () => {
  // Hooks
  // const { user, isLoading, signOut } = useAuth()

  // const handleLogout = async () => {
  //   await signOut()
  // }

  return (
    // <div className="shadow-lg w-1/4 min-w-96 flex flex-col gap-10 p-8 rounded-sm">
    //   {
    //     isLoading ? (
    //       <Skeleton className="h-14 w-full rounded-lg"/>
    //     ) : (
    //       <>
    //         <h1>Bem vindo(a) { user.email }</h1>
    //         <Button
    //           className="rounded-md"
    //           color="primary"
    //           size="lg"
    //           variant="light"
    //           onClick={handleLogout}
    //         >
    //           Deslogar
    //         </Button>
    //       </>
    //     )
    //   }
    // </div>
    <div className='w-full'>
      <FeedContainer />
    </div>
  )
}

export default Feed