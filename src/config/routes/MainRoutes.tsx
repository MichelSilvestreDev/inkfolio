import { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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
  // {
  //   path: '*',
  //   element: <LoaderPage />,
  // },
])

const MainRoutes: React.FC = () => {
  return(
    <RouterProvider
      router={router}
    />
  )
}

export default MainRoutes