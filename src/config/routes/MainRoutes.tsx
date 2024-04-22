import { lazy } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Messages from '../../presentation/pages/Messages';
const Template = lazy(() => import('../../common/Template'));
const CommonTemplate = lazy(() => import('../../common/CommonTemplate'));
const Home = lazy(() => import('../../presentation/pages/home/Home'));
const Profile = lazy(() => import('../../presentation/pages/profile/Profile'));
const Login = lazy(() => import('../../presentation/pages/login/Login'));
const RegisterProfile = lazy(() => import('../../presentation/pages/profile/RegisterProfile'));
const EditProfile = lazy(() => import('../../presentation/pages/profile/EditProfile'));
const PublicProfile = lazy(() => import('../../presentation/pages/profile/PublicProfile'));
const FeedByStyle = lazy(() => import('../../presentation/pages/home/FeedByStyle'));

const router = createBrowserRouter([
  /*
  * Profile routes template
  */
  {
    path: '/perfil',
    element: <Template />,
    children: [
      {
        path: '/perfil',
        element: <Profile />,
      },
      {
        path: '/perfil/configuracao-de-mensagens',
        element: <Messages />,
      },
    ]
  },
  /*
  * Common routes template
  */
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
    path: '/completar-cadastro',
    element: <RegisterProfile />,
  },
  {
    path: '/editar-perfil',
    element: <EditProfile />,
  },
  {
    path: '*',
    element: <Navigate to='/' />,
  },
])

const MainRoutes: React.FC = () => {
  return(
    <RouterProvider
      router={router}
    />
  )
}

export default MainRoutes