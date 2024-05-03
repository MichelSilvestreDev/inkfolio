export interface IProfile {
  user_id: string
  name: string
  phone: string
  bio: string
  tattoo_styles: string
  avatar: string
  address: IProfileAddress
  profile_url: string
  profile_cover?: string
  redes?: IProfileRedes
}

export interface IProfileAddress {
  street: string
  number: string
  city: string
  state: string
  cep?: string
}

export interface IProfileRedes {
  instagram?: string
  facebook?: string
  pinterest?: string
  youtube?: string
  behance?: string
  linkedin?: string
}

export const initialState: IProfile = {
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
  },
  profile_cover: '',
  profile_url: '',
  redes: {},
}
