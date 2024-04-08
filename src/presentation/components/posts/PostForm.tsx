import { Button, Input, Select, SelectItem, Switch, Textarea } from "@nextui-org/react"
import { styles } from "../../containers/post/Posts.container"
import { useState } from "react"

type Form = {
  handleSubmit: (event: { preventDefault: () => void }) => void
  handleInputChange: (fieldName: string, value: string | number | string[] | boolean) => void
  setSelectedFiles: (files: FileList) => void
  posting: boolean
}

const PostForm: React.FC<Form> = ({handleSubmit, handleInputChange, posting}: Form) => {
  const [discount, setDiscount] = useState(false);
  const handleDiscountChange = (isChecked: boolean) => {
    setDiscount(isChecked)
    handleInputChange('avaliable_negociation', isChecked);
    // Aqui você pode fazer o que quiser com o valor de isChecked,
    // por exemplo, enviá-lo para uma função de manipulação de estado ou uma chamada de API.
  };

  return(
    <form className='flex flex-col gap-4 p-4 rounded-lg border' onSubmit={handleSubmit}>

      <Input
        name='title'
        label='Titulo do trabalho'
        type='text'
        onChange={(e) => handleInputChange('title', e.target.value)}
      />

      <Textarea
        isRequired
        label='Descrição'
        name='description'
        placeholder='Adicione uma descrição ao seu post'
        onChange={(e) => handleInputChange('description', e.target.value)}
        />

      <Select
        label='Selecione os estilos'
        name='tatoo_styles'
        placeholder='Selecione ao menos um estilo'
        isRequired
        onChange={(e) => handleInputChange('styles', e.target.value)}
        multiple
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
        name='discount'
        label='Desconto'
        type='number'
        onChange={(e) => handleInputChange('discount', e.target.value)}
      />

      <label>
        Disponibilidade para negociação? <br/>
        <Switch
          checked={discount}
          onChange={(e) => handleDiscountChange(e.target.checked)}
          />  
      </label>

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