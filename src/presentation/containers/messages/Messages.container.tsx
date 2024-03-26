import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../hooks/auth/useAuth'
import { PostMessageValues } from '../../../types/message.types'
import MessageForm from '../../components/messages/MessageForm'
import { NewMessageService } from '../../../services/MessageService'

const initialValues: PostMessageValues = {
  label: '',
  text: '',
  type: '',
  user_id: '',
  created_at: ''
}

// eslint-disable-next-line react-refresh/only-export-components
export const styles = [
  {
    label: 'Old School',
    value: 'old-school'
  },
  {
    label: 'New School',
    value: 'new-school'
  },
  {
    label: 'Tribal',
    value: 'tribal'
  },
  {
    label: 'Minimalista',
    value: 'minimalista'
  },
  {
    label: 'Realista',
    value: 'realista'
  },
]

const MessageContainer: React.FC = () => {
  // Hooks
  const { user } = useAuth()
  // States
  const [formData, setFormData] = useState(initialValues)
  const [isLoadingData, setIsLoading] = useState(false)
  

  const handleInputChange = (fieldName: string, value: string | number | string[] | boolean) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    setIsLoading(true)
    event.preventDefault();     
    formData.user_id = user.uid;

    const post = Object.assign(formData)

    // Submit the post
    try {
      await NewMessageService(post);
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='grid grid-cols-2 gap-4'>
        <MessageForm
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          posting={isLoadingData}
        />
      </div>
    </>
  )
}

export default MessageContainer