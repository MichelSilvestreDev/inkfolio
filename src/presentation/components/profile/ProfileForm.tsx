import { Input, Textarea } from '@nextui-org/input'
import InkFolio from '/img/InkFolio.png'
import { Select, SelectItem } from '@nextui-org/select'
import { Button } from '@nextui-org/button'
import { Avatar } from '@nextui-org/avatar'
import { IProfile } from '../../../types/profile/profile.types'
import { useLocation } from 'react-router-dom'
import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import tattooStyles from '../../../assets/data/tattooStyles'
import { profileSchema } from '../../../types/profile/profileSchema'
import ErrorMessage from '../../../common/ErrorMessage'

interface IForm {
  isLoading: boolean
  formValues: IProfile
  previewFiles: string[]
  handleFiles: (files: FileList | null) => void
  handleInputChange: (fieldName: string, value: string) => void
  submitProfile: (profile: IProfile, isEditing?: boolean) => void
}

const ProfileForm: React.FC<IForm> = ({
  formValues,
  isLoading,
  previewFiles,
  handleFiles,
  handleInputChange,
}) => {
  // Hooks
  const location = useLocation()
  const image = previewFiles.length > 0 ? previewFiles[0] : formValues.avatar || ''

  const {handleSubmit, formState: {errors}, register} = useForm({
    resolver: yupResolver(profileSchema),
  })

  const onSubmit = (data: any) => {
    console.log(data);
    // submitProfile(formValues, Boolean(location.pathname.includes('edit')))
  }

  return(
    <form
      className='w-full max-w-[500px] mx-auto p-4 rounded-lg shadow-lg bg-white flex flex-col gap-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <img
        src={InkFolio}
        className='text-center my-8 mx-auto'
      />

      <div>
        <Avatar src={image} className="w-24 h-24 mx-auto text-large" />
        <label htmlFor="avatar" className='block text-center my-4 text-primary underline cursor-pointer'>
          Selecionar foto de perfil
        </label>
      </div>

      <input
        type="file"
        name="avatar"
        id="avatar"
        className='hidden'
        onChange={(e) => handleFiles(e.target.files)}
        />

      <div>
        <Input
          type='text'
          label='Nome'
          {...register('name')}
        />
        <ErrorMessage errorMessage={errors?.name?.message} />
      </div>

      <Input
        type='text'
        label='Celular (whastsapp - somente números)'
        maxLength={11}
        {...register('phone')}
      />
      {errors?.phone?.message}

      <Textarea
        type='text'
        label='Bio'
        {...register('bio')}
        />
        {errors?.bio?.message}

      <div>
        <Select
          isRequired
          label='Estilos de tatuagem'
          selectionMode="multiple"
          selectedKeys={formValues?.tattoo_styles?.split(',')}
          {...register('tattooStyles')}
        >
          {tattooStyles.map((style) => (
            <SelectItem key={style.value} value={style.value}>
              {style.name}
            </SelectItem>
          ))}
        </Select>
        <ErrorMessage errorMessage={errors?.tattooStyles?.message} />
      </div>

      <Input
        type='text'
        name='profile_url'
        label='Escreva o endereço URL que terá seu perfil'
        onChange={(e) => handleInputChange(e.target.name, e.target.value.split(' ').join('-'))}
        value={formValues.profile_url}
      />
      <Input
        isRequired
        type='text'
        name='address.street'
        label='Endereço do estúdio'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        value={formValues.address.street}
      />
      <Input
        isRequired
        type='number'
        name='address.number'
        label='Número'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        value={formValues.address.number}
      />
      <Input
        isRequired
        type='text'
        name='address.city'
        label='Cidade'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        value={formValues.address.city}
      />
      <Input
        type='text'
        name='address.state'
        label='Estado'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        value={formValues.address.state}
      />
      <Input
        type='text'
        name='redes.instagram'
        label='Instagram'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        value={formValues.redes?.instagram}
      />
      <Input
        type='text'
        name='redes.facebook'
        label='Facebook'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        value={formValues.redes?.facebook}
      />
      <Input
        type='text'
        name='redes.pinterest'
        label='Pinterest'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        value={formValues.redes?.pinterest}
      />
      <Input
        type='text'
        name='redes.youtube'
        label='Youtube'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        value={formValues.redes?.youtube}
      />
      <Input
        type='text'
        name='redes.linkedin'
        label='Linkedin'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        value={formValues.redes?.linkedin}
      />
      <Input
        type='text'
        name='redes.behance'
        label='Behance'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        value={formValues.redes?.behance}
      />
      <Button color='primary' size='lg' type='submit' isLoading={isLoading}>
        Salvar
      </Button>
    </form>
  )
}

export default ProfileForm