import { ScrollShadow } from "@nextui-org/react"


interface IStyleButton {
  style: string
}

const Style: React.FC<IStyleButton> = ({style}) => {
  return (
    <div className='flex flex-col items-center gap-4 cursor-pointer'>
      <div className="w-24 h-24 bg-gray-400 rounded-full"></div>
      <p>{style}</p>
    </div>
  )
}

const TattooStyles: React.FC = () => {
  const styles = ['Old School', 'Realista', 'Tribal', 'Minimalista']

  return (
    <div className='w-full'>
      <div className="container">
        <ScrollShadow 
          hideScrollBar 
          offset={100}
          orientation="horizontal" 
        >
          <div className="flex gap-8">
            {
              styles.map((style, index) => {
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