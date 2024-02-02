import { storage } from '../config/firebase/baseConfig'
import { v4 as uuidv4 } from 'uuid'
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'

export const UploadFileService = async (file: any): Promise<string | boolean> => {
  try {
    const imageRef = storageRef(storage, `files/${uuidv4()}`)
    uploadBytes(imageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            console.log(url)
            return url
          })
          .catch((error) => {
            window.alert(error.message)
          })
      })
      .catch((error) => {
        window.alert(error.message)
      })

    return true
  } catch (err) {
    console.error(err)
    return false
  }
}
