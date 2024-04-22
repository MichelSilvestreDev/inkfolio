import { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
const Home = lazy(() => import('../../presentation/pages/home/Home'));
const Login = lazy(() => import('../../presentation/pages/auth/Login'));
const Register = lazy(() => import('../../presentation/pages/auth/Register'));
const PublicProfile = lazy(() => import('../../presentation/pages/profile/PublicProfile'));
const FeedByStyle = lazy(() => import('../../presentation/pages/home/FeedByStyle'));
const CommonTemplate = lazy(() => import('../../common/CommonTemplate'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <CommonTemplate />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/perfil/:profile_url',
        element: <PublicProfile />,
      },
      {
        path: '/tattoos/:tattoo_style',
        element: <FeedByStyle />,
      },
    ]
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/cadastro',
    element: <Register />,
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