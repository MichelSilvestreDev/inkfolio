import { Button, Input } from "@nextui-org/react"

type Form = {
  handleSubmit: (event: { preventDefault: () => void }) => void
  handleInputChange: (fieldName: string, value: string | number | string[] | boolean) => void
  posting: boolean
}

const MessageForm: React.FC<Form> = ({handleSubmit, handleInputChange, posting}: Form) => {
  return(
    <form className='flex flex-col gap-4 p-4 rounded-lg border' onSubmit={handleSubmit}>

      <Input
        name='label'
        label='Titulo'
        type='text'
        onChange={(e) => handleInputChange('label', e.target.value)}
      />

      <Input
        name='text'
        label='Mensagem'
        type='text'
        onChange={(e) => handleInputChange('text', e.target.value)}
      />

      <Input
        name='type'
        label='Tipo'
        type='text'
        onChange={(e) => handleInputChange('type', e.target.value)}
      />

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