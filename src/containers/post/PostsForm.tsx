import { useState } from "react"
import { PostFormValues } from "../../types/posts.types"
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react"
import usePost from "../../hooks/posts/usePost"

  const initialValues:PostFormValues = {
    user_id: '',
    description: '',
    styles: [],
    urls: [],
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
    await newPost(formData)
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Textarea
        isRequired
        label="Descrição"
        labelPlacement="outside"
        placeholder="Adicione uma descrição ao seu post"
        className="max-w-xs"
        onChange={(e) => handleInputChange('description', e.target.value)}
      />

      <Select
        label="Selecione os estilos"
        placeholder="Selecione ao menos um estilo"
        selectionMode="multiple"
        className="max-w-xs"
        isRequired
        onChange={(e) => handleInputChange('styles', e.target.value)}
      >
        {styles.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>

      <Button
        className="rounded-md"
        color="primary"
        size="lg"
        variant="light"
        type="submit"
      >
        Salvar
      </Button>
    </form>
  )
}

export default PostsForm