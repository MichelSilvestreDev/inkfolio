import { Input } from '@nextui-org/react'
import InkFolioLogo from '/logos/InkFolio-white.png'
import { Search } from '@icon-park/react'
import { Link } from 'react-router-dom'

interface IHeader {
  displayLogo?: boolean
}

const HomeHeader: React.FC<IHeader> = ({displayLogo}) => {
  return (
    <div className='w-full pt-8 pb-16 relative'>
        <div className='flex flex-col justify-center items-center'>
          {
            displayLogo && (
              <Link to='/'>
                <img
                  src={InkFolioLogo} 
                  alt='InkFolio'
                  className='w-40'
                />
              </Link>
            )
          }

          <Input
            label='Pesquisar'
            className='hidden'
            endContent={
              <Search
                theme='outline'
                size='24'
                fill='#333'
                strokeWidth={3}
              />
            }
          />
        </div>
      <div className={`${displayLogo ? 'h-48 ' : 'h-36 '} bg-black absolute w-full top-0 left-0 -z-10`}></div>
    </div>
  )
}

export default HomeHeader