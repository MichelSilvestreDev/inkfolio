import { Link } from 'react-router-dom'
import InkFolioLogo from '/logos/InkFolio-white.png'
import { FacebookOne, Instagram } from '@icon-park/react'

const Footer: React.FC = () => {
  return (
    <footer className='w-full bg-black text-white py-8'>
      <div className="container">
        <Link to='/'>
          <img src={InkFolioLogo} alt='InkFolio' className='w-40' />
        </Link>

        <nav >
          <ul className='my-8 flex flex-col gap-2'>
            <Link to='/'>
              <li> Home </li>
            </Link>
            <Link to='/'>
              <li> Login </li>
            </Link>
            <Link to='/'>
              <li> Criar conta </li>
            </Link>
            <Link to='/'>
              <li> Esqueci minha senha </li>
            </Link>
          </ul>

          <ul className='my-8 flex flex-col gap-2'>
            <Link to='/'>
              <li> Destaques </li>
            </Link>
            <Link to='/'>
              <li> Old School </li>
            </Link>
            <Link to='/'>
              <li> Realista </li>
            </Link>
            <Link to='/'>
              <li> Minimalista </li>
            </Link>
            <Link to='/'>
              <li> Tribal </li>
            </Link>
          </ul>

          <ul className='my-8 flex flex-col gap-2'>
            <li>contato@inkfolio.com.br</li>
            <li >
              <div className='fex gap-4'>
                <Link to='/' className='w-fit'>
                  <FacebookOne theme="outline" size="24" fill="#fff" strokeWidth={3}/>
                </Link>
                <Link to='/' className='w-fit'>
                  <Instagram theme="outline" size="24" fill="#fff" strokeWidth={3}/>
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer