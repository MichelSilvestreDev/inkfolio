import { Button, Input, Select, SelectItem } from "@nextui-org/react"
import { useState } from "react"

type Form = {
  handleSubmit: (event: { preventDefault: () => void }) => void
  handleInputChange: (fieldName: string, value: string | number | string[] | boolean) => void
  posting: boolean
}

const MessageForm: React.FC<Form> = ({handleSubmit, handleInputChange, posting}: Form) => {
  const [ selectValue, setSelectValue] = useState('');

  return(
    <form className='flex flex-col gap-4 p-4 rounded-lg border' onSubmit={handleSubmit}>

      <Input
        name='label'
        label='Título'
        placeholder="Exemplos: Seu nome, assunto da mensagem, data do evento, etc..."
        type='text'
        onChange={(e) => handleInputChange('label', e.target.value)}
      />

      <Input
        name='text'
        label='Mensagem'
        placeholder="Exemplos: Olá! Como posso ajudar? Por favor, digite sua mensagem aqui..."
        type='text'
        onChange={(e) => handleInputChange('text', e.target.value)}
      />

      <Select
        name='type'
        label='Tipo'
        value={selectValue}
        onChange={(e) => {
          handleInputChange('type', e.target.value);
          setSelectValue(e.target.value)
        }}
      >
        <SelectItem key="text" value="text">Texto</SelectItem>
        <SelectItem key="number" value="number">Numérico</SelectItem>
        <SelectItem key="date" value="date">Data</SelectItem>
        <SelectItem key="textarea" value="textarea">Textos Maiores</SelectItem>
      </Select>

      <Button
        className='rounded-md'
        color='primary'
        size='lg'
        type='submit'
        isLoading={posting}
        disabled={posting}
      >
        { posting ? 'Salvando...' : 'Salvar' }
      </Button>
    </form>
  )
}

export default MessageForm