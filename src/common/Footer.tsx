import { Link } from 'react-router-dom'
import InkFolioLogo from '/logos/InkFolio-white.png'
import { FacebookOne, Instagram } from '@icon-park/react'
import tattooStyles from '../assets/data/tattooStyles'

const Footer: React.FC = () => {
  return (
    <footer className='w-full bg-black text-white py-8'>
      <div className="container mx-auto">
        <Link to='/'>
          <img src={InkFolioLogo} alt='InkFolio' className='w-40' />
        </Link>

        <nav className='flex flex-col sm:grid sm:grid-cols-3'>
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
            {
              tattooStyles.map( (style, index) => {
                return (
                  <Link to={`/tattoos/${style.url}`} key={index}>
                    <li>{ style.name }</li>
                  </Link>
                )
              })
            }
          </ul>

          <ul className='my-8 flex flex-col gap-2'>
            <li>contato@inkfolio.com.br</li>
            <li >
              <Link to='/' className='w-fit'>
                <FacebookOne theme="outline" size="24" fill="#fff" strokeWidth={3}/>
              </Link>
            </li>
            <li>
              <Link to='/' className='w-fit'>
                <Instagram theme="outline" size="24" fill="#fff" strokeWidth={3}/>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer