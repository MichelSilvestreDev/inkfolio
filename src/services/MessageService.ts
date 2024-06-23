import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../config/firebase/baseConfig'
import { IPostMessageValues } from '../types/message.types'

export const NewMessageService = async (
  newMessage: IPostMessageValues,
): Promise<IPostMessageValues | boolean> => {
  try {
    await addDoc(collection(db, 'messages'), newMessage)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

export const GetUserMessages = async (userId: string) => {
  const messages: IPostMessageValues[] = []
  const messageRef = collection(db, 'messages')
  try {
    const res = query(messageRef, where('user_id', '==', userId))
    const querySnapshot = await getDocs(res)

    querySnapshot.forEach((doc) => {
      const message = doc.data() as IPostMessageValues
      message.id = doc.id
      messages.push(message)
    })
    return messages
  } catch (err) {
    console.error('Erro ao obter posts:', err)
    throw err
  }
}

export const DeleteUserMessage = async (messageId: string): Promise<boolean> => {
  try {
    // Construir a referência do documento da mensagem
    const messageDocRef = doc(db, 'messages', messageId)

    // Excluir o documento
    await deleteDoc(messageDocRef)

    // Retorna true para indicar sucesso
    return true
  } catch (error) {
    console.error('Erro ao excluir mensagem:', error)
    // Retorna false em caso de erro
    return false
  }
}
