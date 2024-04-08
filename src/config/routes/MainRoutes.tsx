import { lazy } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Messages from '../../presentation/pages/Messages';
const Template = lazy(() => import('../../common/Template'));
const Feed = lazy(() => import('../../presentation/pages/Feed'));
const Profile = lazy(() => import('../../presentation/pages/profile/Profile'));
const RegisterProfile = lazy(() => import('../../presentation/pages/profile/RegisterProfile'));
const EditProfile = lazy(() => import('../../presentation/pages/profile/EditProfile'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Template />,
    children: [
      {
        path: '/',
        element: <Feed />,
      },
      {
        path: '/perfil',
        element: <Profile />,
      },
      {
        path: '/configuracao-de-mensagens',
        element: <Messages />,
      },
    ]
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