import { Image } from "@nextui-org/react"

type Preview = {
  previewFiles: string[]
}

const PreviewFiles: React.FC<Preview> = ({previewFiles}: Preview) => {
  return (
    <div>
      <div className='mb-8'>
        <Image
          src={previewFiles[0]}
        />
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {
          previewFiles.map((preview, index) => {
            return (
              index > 0 && <Image src={preview} alt="" key={index}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default PreviewFiles