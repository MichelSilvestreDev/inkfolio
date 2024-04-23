import { Spinner } from '@nextui-org/react'

const Loader: React.FC = () => {
  return(
    <div className='w-full flex justify-center items-center my-8'>
      <Spinner size='lg' color='primary' />
    </div>
  )
}

export default Loader