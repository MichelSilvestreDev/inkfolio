import { Outlet, useNavigate } from "react-router-dom"
import SidebarMenu from "./SidebarMenu"
import useProfile from "../hooks/profile/useProfile"
import React, { useEffect } from "react"

const Template: React.FC = () => {
  const {profile} = useProfile()
  const navigate = useNavigate()

  useEffect(() => {
    if(profile.name === "") navigate('/completar-cadastro')
  }, [profile.name])

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