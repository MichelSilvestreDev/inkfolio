import { Button, Input } from "@nextui-org/react"
import { useState } from "react"
import useUploadFile from "../../../hooks/posts/useUploadFile"

const UploadFileContainer: React.FC = () => {
    // Hooks
  const {isLoading, upload } = useUploadFile()
  // States
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)

  const handleFiles = (files: FileList | null) => {
    if(files) setSelectedFiles(files)
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    // await upload(selectedFiles)

    if (!selectedFiles) {
      // Handle the case where no files are selected
      window.alert('Selecione ao menos um arquivo')
      return;
    }

    // Array to store upload promises
    const uploadPromises = [];

    // Iterate through each selected file
    for (const file of selectedFiles) {
      // Add the upload promise for each file to the array
      uploadPromises.push(upload(file));
    }

    try {
      // Wait for all uploads to complete
      await Promise.all(uploadPromises);
      console.log('All files uploaded successfully!');
      window.alert('Salvo com sucesso!')
    } catch (error) {
      console.error('Error uploading files:', error);
      window.alert('Erro ao salvar')
      // Handle errors if necessary
    }
  }

  return(
    <form className='flex flex-col gap-4 p-8 rounded-lg border' onSubmit={handleSubmit}>
      <h1 className='font-bold text-2xl'>Adicionar Tatuagem</h1>

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