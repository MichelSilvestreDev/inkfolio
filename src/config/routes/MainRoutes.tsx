import { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
const Template = lazy(() => import('../../components/Template'));
const Feed = lazy(() => import('../../presentation/pages/Feed'));
const NewPost = lazy(() => import('../../presentation/pages/posts/NewPost'));

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
        path: '/novo',
        element: <NewPost />,
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