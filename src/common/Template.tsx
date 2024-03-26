import { Outlet } from "react-router-dom"
import SidebarMenu from "./SidebarMenu"

const Template: React.FC = () => {
  return(
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="w-full h-screen grid grid-cols-12 gap-8">
        <div className="col-start-1 col-end-4">
          <SidebarMenu />
        </div>
        <div className="min-h-screen overflow-y-scroll col-start-4 col-end-13">
          <div className="container lg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Template