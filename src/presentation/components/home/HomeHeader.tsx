import { Input } from '@nextui-org/react'
import InkFolioLogo from '/logos/InkFolio-white.png'
import { Search } from '@icon-park/react'

const HomeHeader: React.FC = () => {
  return (
    <div className='w-full pt-8 pb-16 relative'>
      <div className='container'>
        <div className='flex flex-col justify-center items-center'>
          <img
            src={InkFolioLogo} 
            alt='InkFolio'
            className='w-40 pb-8'
          />

          <Input
            label='Pesquisar'
            className=''
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
      </div>
      <div className='bg-black absolute h-72 w-full top-0 left-0 -z-10'></div>
    </div>
  )
}

export default HomeHeader