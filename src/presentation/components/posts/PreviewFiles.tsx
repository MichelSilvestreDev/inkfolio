import { Close } from "@icon-park/react"
import { Button, Image, ScrollShadow } from "@nextui-org/react"

type Preview = {
  previewFiles: string[]
  removeFile: (index: number) => void
}

const PreviewFiles: React.FC<Preview> = ({previewFiles, removeFile}: Preview) => {
  return (
    <div>
      <div className='mb-4 relative'>
        <Image
          src={previewFiles[0]}
          onClick={() => removeFile(0)}
          isBlurred
        />
        <Button color="danger" aria-label="Like" variant='light' size='sm' onClick={() => removeFile(0)}>
          <Close theme="outline" size="12" fill="#ff0000" strokeWidth={3}/>
          Remover
        </Button>
      </div>
      <ScrollShadow hideScrollBar className='grid grid-cols-3 gap-4 overflow-y-scroll h-[180px] pb-8'>
        {
          previewFiles.map((preview, index) => {
            return (
              index > 0 && (
                <div>
                  <Image src={preview} alt="" key={index}/>
                  <Button color="danger" aria-label="Like" variant='light' size='sm' onClick={() => removeFile(index)}>
                    <Close theme="outline" size="12" fill="#ff0000" strokeWidth={3}/>
                    Remover
                  </Button>
                </div>
              )
            )
          })
        }
      </ScrollShadow>
    </div>
  )
}

export default PreviewFiles