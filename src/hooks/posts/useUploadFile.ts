import { useState } from 'react'
import { UploadFileService } from '../../services/uploadFileService'

const useUploadFile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [filesUrls, setFilesUrls] = useState<string[]>([])

  const upload = async (file: any) => {
    setIsLoading(true)

    await UploadFileService(file)
      .then((result) => {
        if (typeof result === 'string') {
          setFilesUrls([...filesUrls, result])
          window.alert('Salvo com sucesso!')
        } else {
          window.alert('Erro ao salvar')
        }
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return {
    isLoading,
    filesUrls,
    upload,
  }
}

export default useUploadFile
