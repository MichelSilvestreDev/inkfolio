import { useState } from 'react'
import { PostFormValues } from '../../types/posts.types'
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import usePost from '../../hooks/posts/usePost'

  const initialValues:PostFormValues = {
    user_id: '',
    description: '',
    styles: [],
    urls: ['https://pbs.twimg.com/profile_images/740345504949768192/xbj5lvnD_400x400.jpg'],
    created_at: '',
  }

  const styles = [
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

const PostsForm: React.FC = () => {
  // Hooks
  const { isLoading, newPost } = usePost()
  // States
  const [formData, setFormData] = useState(initialValues)

  const handleInputChange = (fieldName: string, value: string | number | string[]) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    
    event.preventDefault()
    console.log('aqui', formData);
    await newPost(formData)
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <Textarea
        isRequired
        label='Descrição'
        name='description'
        placeholder='Adicione uma descrição ao seu post'
        // className='max-w-xs'
        onChange={(e) => handleInputChange('description', e.target.value)}
      />

      <Input
        name='urls'
        type='file'
      />

      <Select
        label='Selecione os estilos'
        name='styles'
        placeholder='Selecione ao menos um estilo'
        selectionMode='multiple'
        isRequired
        onChange={(e) => handleInputChange('styles', e.target.value)}
      >
        {styles.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
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
        isLoading={isLoading}
        disabled={isLoading}
      >
        { isLoading ? 'Salvando...' : 'Salvar' }
      </Button>
    </form>
  )
}

export default PostsForm