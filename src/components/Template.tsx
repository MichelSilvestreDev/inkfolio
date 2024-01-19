import { Outlet } from "react-router-dom"
import SidebarMenu from "./SidebarMenu"

const Template: React.FC = () => {
  return(
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="grid grid-cols-6 gap-8">
        <SidebarMenu />
        <div className="cols-span-5">
          <div className="container lg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Template