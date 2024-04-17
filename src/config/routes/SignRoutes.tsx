import { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const Home = lazy(() => import('../../presentation/pages/Home'));
const Login = lazy(() => import('../../presentation/pages/login/Login'));
const PublicProfile = lazy(() => import('../../presentation/pages/profile/PublicProfile'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/perfil/:profile_url',
    element: <PublicProfile />,
  },
  {
    path: '*',
    element: <Login />,
  },
])

const SignRoutes: React.FC = () => {
  return(
    <RouterProvider
      router={router}
    />
  )
}

export default SignRoutes