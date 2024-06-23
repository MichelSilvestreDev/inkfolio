import { useState } from 'react'
import { IPostMessageValues } from '../../types/message.types'
import { NewMessageService } from '../../services/MessageService'

const useMessage = () => {
  // States
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const newMessage = async (message: IPostMessageValues) => {
    setIsLoading(true)
    const created: string = new Date().toISOString()

    message['created_at'] = created

    await NewMessageService(message)
      .then((result) => {
        if (result) {
          console.log('Salvo com sucesso!')
        } else {
          console.log('Erro ao salvar')
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
    newMessage,
  }
}

export default useMessage
