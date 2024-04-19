import { Image, ScrollShadow } from '@nextui-org/react'
import tattooStyles from '../../../assets/data/tattooStyles'
import { ITattooStyles } from '../../../types/posts.types'
import { Link } from 'react-router-dom'


interface IStyleButton {
  style: ITattooStyles
}

const Style: React.FC<IStyleButton> = ({style}) => {
  return (
    <div className=''>
      <Link to={`/tattoos/${style.url}`} className='flex flex-col items-center gap-4'>
        <div className='w-24 h-24 rounded-full shadow-lg'>
          <Image
            src={style.img}
            className='rounded-full'
            alt={style.name}
          />
        </div>
        <p>{style.name}</p>
      </Link>
    </div>
  )
}

const TattooStyles: React.FC = () => {

  return (
    <div className='w-full'>
      <div className='container'>
        <ScrollShadow 
          hideScrollBar 
          size={80}
          orientation='horizontal' 
        >
          <div className='flex gap-8'>
            {
              tattooStyles.map((style, index) => {
                return (
                  <Style key={index} style={style} />
                )
              })
            }
          </div>
        </ScrollShadow>
      </div>
    </div>
  )
}

export default TattooStyles