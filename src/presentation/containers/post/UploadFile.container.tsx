import { Button, Input } from "@nextui-org/react"
import { useState } from "react"
import useUploadFile from "../../../hooks/posts/useUploadFile"

const UploadFileContainer: React.FC = () => {
  // States
  const [selectedFiles, setSelectedFiles] = useState([])
  // Hooks
  const {isLoading, upload } = useUploadFile()

  const handleFiles = (files: any) => {
    setSelectedFiles(files)
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    await upload(selectedFiles)
  }

  return(
    <form className='flex flex-col gap-4 p-8 rounded-lg border' onSubmit={handleSubmit}>
      <h1 className='font-bold text-2xl'>Criar nova publicação</h1>

      <Input
        name='urls'
        type='file'
        onChange={(e) => handleFiles(e.target.files)}
        multiple
      />

      <Button
        className='rounded-md'
        color='primary'
        size='lg'
        type='submit'
        isLoading={isLoading}
        disabled={isLoading}
      >
        { isLoading ? 'Salvando...' : 'Salvar' }
      </Button>
    </form>
  )
}

export default UploadFileContainer