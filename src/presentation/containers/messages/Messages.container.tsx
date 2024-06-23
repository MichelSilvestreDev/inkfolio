import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../hooks/auth/useAuth';
import { IPostMessageValues } from '../../../types/message.types';
import MessageForm from '../../components/messages/MessageForm';
import { DeleteUserMessage, GetUserMessages, NewMessageService } from '../../../services/MessageService';
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react';

const initialValues: IPostMessageValues = {
  id: '',
  label: '',
  text: '',
  type: '',
  user_id: '',
  created_at: ''
};

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
];

const MessageContainer: React.FC = () => {
  // Hooks
  const { user } = useAuth();

  // States
  const [formData, setFormData] = useState(initialValues);
  const [isLoadingData, setIsLoading] = useState(false);
  const [messageId, setMessageId] = useState('');
  const [messageData, setMessagesData] = useState<IPostMessageValues[]>([]);

  // Function to fetch user messages
  const getUserMessages = async (userId: string) => {
    const messages = await GetUserMessages(userId);
    setMessagesData(messages);
  };

  const handleInputChange = (fieldName: string, value: string | number | string[] | boolean) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    setIsLoading(true);
    event.preventDefault();
    formData.user_id = user.uid;

    try {
      await NewMessageService(formData);
      // Fetch updated messages after adding a new one
      getUserMessages(user.uid);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    // Faça algo com o ID, como chamar um serviço para excluir a mensagem do banco de dados
    try {
      DeleteUserMessage(messageId)
      setMessageId(messageId)
    } catch (error) {
      console.log(error);
    }

  }

  // Fetch user messages on component mount
  useEffect(() => {
    getUserMessages(user.uid);
  }, [user.uid, messageId]); // Trigger only when user id changes
  return (
    <>
      <ToastContainer />
      <div className='grid grid-cols-1 gap-8'>       
        <h1 className="text-2xl text-center font-bold">Painel do Chatbot de Mensagens</h1>
        <p className='text-center'>Aqui você pode gerenciar as mensagens que serão exibidas no chatbot do seu estúdio! 😊</p>
        <MessageForm
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          posting={isLoadingData}
        />
        {/* Display messages here */}
        <div>

        <div className='grid grid-cols-1 gap-4'>
          {messageData && messageData.length > 0 ? (
            <Table aria-label="User Messages">
              <TableHeader>
                <TableColumn>Titulo</TableColumn>
                <TableColumn>Mensagem</TableColumn>
                <TableColumn>Tipo</TableColumn>
                <TableColumn>Ação</TableColumn>
              </TableHeader>
              <TableBody>
                {messageData.map((message, index) => (
                  <TableRow key={index}>
                    <TableCell>{message.label}</TableCell>
                    <TableCell>{message.text}</TableCell>
                    <TableCell>{message.type}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleDeleteMessage(message.id)}>Excluir</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          ) : (
            <Tooltip showArrow={true} content="Por favor, preencha o formulário para adicionar novas mensagens.">
              <Button>Nenhuma mensagem adicionada ainda.</Button>
           </Tooltip>
          )}
        </div>
        </div>


      </div>
    </>
  );
};

export default MessageContainer;
