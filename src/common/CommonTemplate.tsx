import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Menu from './Menu'
import { NewAccountFloatBtn } from './NewAccountFloatBtn'

const CommonTemplate: React.FC = () => {
  return (
    <div>
      <Menu />
      <Outlet />
      <NewAccountFloatBtn />
      <Footer />
    </div>
  )
}

export default CommonTemplate