import { LeftC, RightC } from "@icon-park/react"
import { Button, Image } from "@nextui-org/react"
import { memo, useState } from "react"

type Slide = {
  urls: string[]
}

const PostImgSlide: React.FC<Slide> = memo(({ urls }: Slide) => {
  const [currentUrl, setCurrentUrl] = useState<number>(0)

  const nextUrl = () => {
    const index = currentUrl + 1
    if (urls.length - 1 >= index) {
      setCurrentUrl(index)
    }
  }

  const prevUrl = () => {
    if (currentUrl > 0) setCurrentUrl(currentUrl - 1)
  }

  return (
    <>
      <Image
        alt='Card background'
        className='object-cover rounded-t-lg  min-h-[500px]' 
        src={urls[currentUrl]}
        isBlurred
      
      />
      <div className='w-full h-full flex justify-between items-center absolute z-20'>
        <Button
          isIconOnly
          size='sm'
          className={`${currentUrl === 0 && 'opacity-30 '} -ml-4`}
          onPress={prevUrl}
          disabled={currentUrl === 0}
        >
          <LeftC theme="outline" size="20" fill="#333" strokeWidth={3} />
        </Button>

        <Button
          isIconOnly
          size='sm'
          className={`${urls.length - 1 < currentUrl + 1 && 'opacity-30 '} -mr-4`}
          onPress={nextUrl}
          disabled={urls.length - 1 < currentUrl + 1}
        >
          <RightC theme="outline" size="20" fill="#333" strokeWidth={3} />
        </Button>
      </div>
    </>
  )
})

export default PostImgSlide