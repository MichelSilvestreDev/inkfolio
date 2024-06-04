import { array, mixed, object, string } from 'yup'
import { IProfile } from './profile.types'
import { avatar } from '@nextui-org/react'

const profileInitialState: IProfile = {
  user_id: '',
  name: '',
  phone: '',
  bio: '',
  tattoo_styles: '',
  avatar: '',
  address: {
    street: '',
    number: '',
    city: '',
    state: '',
    cep: '',
  },
  profile_cover: '',
  profile_url: '',
  redes: {
    instagram: '',
    facebook: '',
    pinterest: '',
    youtube: '',
    behance: '',
    linkedin: '',
  },
}

const profileSchema = object({
  name: string().required('Campo obrigatório').min(3, 'Não atinge o minimo'),
  phone: string()
    .required('Campo obrigatório')
    .min(10, 'Não atinge o minimo')
    .max(11, 'Acima do máximo'),
  bio: string().required('Campo obrigatório'),
  // tattooStyles: string()2re
  // .min(1, 'Selecione ao menos um estilo')
  // .required('Selecione ao menos um estilo'),
  avatar: string(),
})

export { profileInitialState, profileSchema }
