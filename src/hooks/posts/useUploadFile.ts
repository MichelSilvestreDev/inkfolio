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

  const uploadFiles = async (selectedFiles: FileList): Promise<string[]> => {
    setIsLoading(true)

    // Array to store upload promises
    const uploadPromises: Promise<string>[] = []

    // Iterate through each selected file
    for (const file of selectedFiles) {
      // Add the upload promise for each file to the array
      const promise = upload(file).then((url) => {
        if (typeof url === 'string') {
          return url
        } else {
          throw new Error('Upload failed')
        }
      })
      uploadPromises.push(promise)
    }

    try {
      // Wait for all uploads to complete
      const urls = await Promise.all(uploadPromises)
      return urls
    } catch (error) {
      console.error('Error uploading files:', error)
      // Handle errors if necessary
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    upload,
    uploadFiles,
  }
}

export default useUploadFile
