import { storage } from '../config/firebase/baseConfig'
import { v4 as uuidv4 } from 'uuid'
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'

export const UploadFileService = (file: File, directory: string) => {
  return new Promise((resolve, reject) => {
    try {
      const imageRef = storageRef(storage, `${directory}/${uuidv4()}`)
      uploadBytes(imageRef, file)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              resolve(url)
            })
            .catch((error) => {
              const message = error.message
              window.alert('Deu ruim')
              console.error(message)
              reject(message)
            })
        })
        .catch((error) => {
          window.alert(error.message)
        })
    } catch (err) {
      console.error(err)
      return false
    }
  })
}
