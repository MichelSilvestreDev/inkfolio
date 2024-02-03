import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react"
import { styles } from "../../containers/post/Posts.container"

type Form = {
  handleSubmit: (event: { preventDefault: () => void }) => void
  handleInputChange: (fieldName: string, value: string | number | string[]) => void
  setSelectedFiles: (files: FileList) => void
  posting: boolean
}

const PostForm: React.FC<Form> = ({handleSubmit, handleInputChange, posting}: Form) => {
  return(
    <form className='flex flex-col gap-4 p-8 rounded-lg border' onSubmit={handleSubmit}>
      <h1 className='font-bold text-2xl'>Criar nova publicação</h1>
      <Textarea
        isRequired
        label='Descrição'
        name='description'
        placeholder='Adicione uma descrição ao seu post'
        // className='max-w-xs'
        onChange={(e) => handleInputChange('description', e.target.value)}
        />

      <Select
        label='Selecione os estilos'
        name='styles'
        placeholder='Selecione ao menos um estilo'
        selectionMode='multiple'
        isRequired
        onChange={(e) => handleInputChange('styles', e.target.value)}
      >
        {styles.map((style) => (
          <SelectItem key={style.value} value={style.value}>
            {style.label}
          </SelectItem>
        ))}
      </Select>

      <Input
        name='price'
        label='Preço do serviço'
        type='text'
        onChange={(e) => handleInputChange('price', e.target.value)}
      />

      <Input
        name='tags'
        label='Marcar pessoas'
        type='text'
        onChange={(e) => handleInputChange('tags', e.target.value)}
      />

      <Input
        name='location'
        label='Localização'
        type='text'
        onChange={(e) => handleInputChange('location', e.target.value)}
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

export default PostForm