import { Input, Textarea } from '@nextui-org/input'
import InkFolio from '/img/InkFolio.png'
import { Select, SelectItem } from '@nextui-org/select'
import { Button } from '@nextui-org/button'
import { Avatar } from '@nextui-org/avatar'
import { IProfile } from '../../../types/profile.types'
import { FormEvent } from 'react'

interface IForm {
  isLoading: boolean
  formValues: IProfile
  handleInputChange: (fieldName: string, value: string) => void
  submitProfile: (profile: IProfile) => void
}

const ProfileForm: React.FC<IForm> = ({formValues, isLoading, handleInputChange, submitProfile}) => {

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    submitProfile(formValues)
  }

  return(
    <form
      className='w-full max-w-[500px] mx-auto p-4 rounded-lg shadow-lg bg-white flex flex-col gap-4'
      onSubmit={onSubmit}
    >
      <img
        src={InkFolio}
        className='text-center my-8 mx-auto'
      />

      <div>
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-24 h-24 mx-auto text-large" />
        <label htmlFor="avatar" className='block text-center my-4 text-primary underline cursor-pointer'>
          Selecionar foto de perfil
        </label>
      </div>

      <input
        type="file"
        name="avatar"
        id="avatar"
        className='hidden'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
      />

      <Input
        isRequired
        type='text'
        name='name'
        label='Nome'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
      />
      <Input
        isRequired
        type='text'
        name='phone'
        label='Telefone'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
      />
      <Textarea
        isRequired
        type='text'
        name='bio'
        label='Bio'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        />
      <Select
        isRequired
        name='bio'
        label='Estilos de tatuagem'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        selectionMode="multiple"
      >
        {['Old School', 'Minimalista', 'Tribal'].map((style) => (
          <SelectItem key={style} value={style}>
            {style}
          </SelectItem>
        ))}
      </Select>
      <Input
        type='text'
        name='address'
        label='Endereço do estúdio'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
      />
      <Input
        type='text'
        name='redes'
        label='Link de redes sociais'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
      />
      <Button color='primary' size='lg' type='submit' isLoading={isLoading}>
        Salvar
      </Button>
    </form>
  )
}

export default ProfileForm