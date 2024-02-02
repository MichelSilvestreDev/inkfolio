import { AddFour, Calendar, Home, Message, Search, TipsOne } from "@icon-park/react"
import { Skeleton, User } from "@nextui-org/react"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/auth/useAuth"

const SidebarMenu: React.FC = () => {
  // Hooks
  const { user, isLoading } = useAuth()

  return (
    <nav className="w-full h-screen border-r border-gray-50 shadow-xl bg-white">
      <Link to='/' >
        <h1 className="text-2xl text-center font-bold mt-10 mb-12">InkFolio</h1>
      </Link>
      <ul className="px-4 flex flex-col gap-4">
        <Link to='/'>
          <li className="flex gap-4 h-11 items-center rounded-lg pl-4 hover:bg-gray-100 ease-linear duration-200">
            <Home theme="outline" size="24" fill="#333" strokeWidth={3}/>
            Página incial
          </li>
        </Link>
        <Link to='/'>
          <li className="flex gap-4 h-11 items-center rounded-lg pl-4 hover:bg-gray-100 ease-linear duration-200">
            <Message theme="outline" size="24" fill="#333" strokeWidth={3}/>
            Mensagens
          </li>
        </Link>
        <Link to='/'>
          <li className="flex gap-4 h-11 items-center rounded-lg pl-4 hover:bg-gray-100 ease-linear duration-200">
            <Calendar theme="outline" size="24" fill="#333" strokeWidth={3}/>
            Agenda
          </li>
        </Link>
        <Link to='/novo'>
          <li className="flex gap-4 h-11 items-center rounded-lg pl-4 hover:bg-gray-100 ease-linear duration-200">
            <AddFour theme="outline" size="24" fill="#333" strokeWidth={3}/>
            Criar
          </li>
        </Link>
        <Link to='/'>
          <li className="flex gap-4 h-11 items-center rounded-lg pl-4 hover:bg-gray-100 ease-linear duration-200">
            <TipsOne theme="outline" size="24" fill="#333" strokeWidth={3}/>
            Notificações
          </li>
        </Link>
        <Link to='/'>
          <li className="flex gap-4 h-11 items-center rounded-lg pl-4 hover:bg-gray-100 ease-linear duration-200">
            <Search theme="outline" size="24" fill="#333" strokeWidth={3}/>
            Pesquisar
          </li>
        </Link>
        { isLoading && (
          <div className="flex gap-3">
            <Skeleton className="h-10 w-10 rounded-full"/>
            <Skeleton className="h-10 w-44 rounded"/>
          </div>
        )}
        { !isLoading && (
          <Link to='/'>
            <User
              name={user.email}
              description="InkFolio"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
              }}
            />
          </Link>
        ) }
      </ul>
    </nav>
  )
}

export default SidebarMenu