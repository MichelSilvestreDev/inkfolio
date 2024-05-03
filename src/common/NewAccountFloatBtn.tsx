import { Plus } from '@icon-park/react'
import { Button } from '@nextui-org/react'
import { Link } from 'react-router-dom'

export const NewAccountFloatBtn: React.FC = () => {
  return(
    <div className='fixed bottom-4 sm:bottom-8 right-4 z-50'>
      <Link to='/cadastro' target='_blank'>
        <Button size='sm' color='primary' radius='lg' className='shadow-lg'>
          <Plus theme="outline" size="24" fill="#fff" strokeWidth={3}/>
          Crie o seu InkFolio
        </Button>
      </Link>
    </div>
  )
}