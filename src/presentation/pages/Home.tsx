import { Input } from '@nextui-org/react'
import InkFolioLogo from '/logos/InkFolio-white.png'

const Home: React.FC = () => {
  return (
    <div className='w-full'>
      <div className='w-full bg-black flex justify-center items-center py-8'>
        <img
          src={InkFolioLogo} 
          alt='InkFolio'
          className='w-40 py-4'
        />

        <Input
          label='Pesquisar'
          className='hidden'
        />
      </div>
    </div>
  )
}

export default Home