import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../../pages/Login";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  // {
  //   path: '*',
  //   element: <LoaderPage />,
  // },
])

const SignRoutes: React.FC = () => {
  return(
    <RouterProvider
      router={router}
    />
  )
}

export default SignRoutes