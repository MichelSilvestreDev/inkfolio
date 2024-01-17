import { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const Login = lazy(() => import('../../pages/login/Login'));

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