import { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
const Template = lazy(() => import('../../common/Template'));
const Feed = lazy(() => import('../../presentation/pages/Feed'));
const Profile = lazy(() => import('../../presentation/pages/Profile'));

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