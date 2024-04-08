import { Outlet, useNavigate } from "react-router-dom"
import SidebarMenu from "./SidebarMenu"
import { useEffect } from "react"
import useProfile from "../hooks/profile/useProfile"
import { useAuth } from "../hooks/auth/useAuth"

const Template: React.FC = () => {
  // Hooks
  const navigate = useNavigate()
  const {user} = useAuth()
  const {profile, getUserProfile} = useProfile()

  useEffect(() => {
    if(user.uid && profile.name === '') {
      (async () => {
        console.log( user.uid);
        const profileData = await getUserProfile(user.uid)
        if(profileData.name === ''){
          navigate('/completar-cadastro')
        }
      })()
    }
  }, [profile, user.uid])

  return(
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="w-full h-screen grid grid-cols-1 sm:grid-cols-12 gap-8">
        <div className="hidden md:block col-start-1 col-end-4">
          <SidebarMenu />
        </div>
        <div className="min-h-screen overflow-y-scroll sm:col-start-4 sm:col-end-13 relative">
          <div className="container lg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Template