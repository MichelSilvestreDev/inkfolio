import { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
const Feed = lazy(() => import('./../../pages/Feed'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Feed />,
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