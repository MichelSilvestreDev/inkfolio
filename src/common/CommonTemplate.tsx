import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Menu from "./Menu"

const CommonTemplate: React.FC = () => {
  return (
    <div>
      <Menu />
      <Outlet />
      <Footer />
    </div>
  )
}

export default CommonTemplate