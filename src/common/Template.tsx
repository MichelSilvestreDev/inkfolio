import { Outlet } from "react-router-dom"
import SidebarMenu from "./SidebarMenu"

const Template: React.FC = () => {

  return(
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="w-full h-screen grid grid-cols-1 sm:grid-cols-12">
        <div className="md:block col-start-1 col-end-4">
          <SidebarMenu />
        </div>
        <div className="min-h-screen overflow-y-scroll sm:col-start-4 sm:col-end-13 relative">
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Template