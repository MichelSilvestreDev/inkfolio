import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle, Tooltip } from '@nextui-org/react'
import InkFolioLogo from '/logos/InkFolio-white.png'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useAuth } from '../hooks/auth/useAuth';

const Menu: React.FC = () => {
  // Hooks
  const {user, signOut} = useAuth()
  // States
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className='bg-black text-white'>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand>
          <Link to='/'>
            <img src={InkFolioLogo} alt="InkFolio" className='w-28'/>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link to='/'>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Tooltip content='Em breve' color='danger'>
            <Link to='/'>
              O que é o InkFolio
            </Link>
          </Tooltip>
        </NavbarItem>
        <NavbarItem>
          <Tooltip content='Em breve' color='danger'>
            <Link to='/'>
              Equipe
            </Link>
          </Tooltip>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify='end'>
        {
          user?.isLogged ? (
            <NavbarItem>
              <Link to='/perfil'>
                <Button color='primary' variant='flat'>
                  Acessar conta
                </Button>
              </Link>
            </NavbarItem>
          ) : (
            <>
              <NavbarItem className='hidden lg:flex'>
                <Link to='/login'>Entrar</Link>
              </NavbarItem>
              <NavbarItem>
                <Link to='/cadastro'>
                  <Button color='primary' variant='flat'>
                    Cadastrar-se
                  </Button>
                </Link>
              </NavbarItem>
            </>
          )
        }
      </NavbarContent>
      <NavbarMenu>
        <NavbarItem >
          <Link to='/'> Home </Link>
        </NavbarItem>
          {
            user.isLogged ? (
              <>
                <NavbarItem >
                  <Link to='/'> Perfil </Link>
                </NavbarItem>
                <NavbarItem onClick={handleLogout}>
                  <Button variant='light'> Sair </Button>
                </NavbarItem>
              </>
            ) : (
              <>
                <NavbarItem >
                  <Link to='/login'> Entrar </Link>
                </NavbarItem>
                <NavbarItem >
                  <Link to='/cadastro'> Criar conta </Link>
                </NavbarItem>
              </>
            )
          }
      </NavbarMenu>
    </Navbar> 
  )
}

export default Menu