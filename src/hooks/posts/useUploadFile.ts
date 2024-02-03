import { useState } from 'react'
import { UploadFileService } from '../../services/uploadFileService'

const useUploadFile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const upload = async (file: File) => {
    setIsLoading(true)

    const url = await UploadFileService(file, 'files')
      .then((result) => {
        if (typeof result === 'string') {
          return result
        }
      })
      .catch((err) => {
        console.error(err)
        return false
      })
      .finally(() => {
        setIsLoading(false)
      })

    return url
  }

  return {
    isLoading,
    upload,
  }
}

export default useUploadFile
