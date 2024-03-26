import { addDoc, collection } from 'firebase/firestore'
import { db } from '../config/firebase/baseConfig'
import { PostMessageValues } from '../types/message.types'

export const NewMessageService = async (newMessage: PostMessageValues): Promise<PostMessageValues | boolean> => {
  try {
    await addDoc(collection(db, 'messages'), newMessage)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

