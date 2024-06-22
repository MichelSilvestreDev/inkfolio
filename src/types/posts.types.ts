interface IPostFormValues {
  title: string
  description: string
  styles: string[]
  urls: string[]
  price?: number
  discount?: number
  avaliable_negociation?: boolean
  created_at: string
  updated_at?: string
  deleted_at?: string
}

interface IPost {
  id: string
  user: IPostUser
  title: string
  description: string
  price?: number
  styles: string[]
  urls: string[]
  created_at: string
  updated_at?: string
  deleted_at?: string
}

interface IPostUser {
  id: string
  email: string
  name: string
  avatar: string
  profileUrl: string
}

interface ITattooStyles {
  name: string
  description?: string
  img: string
  value: string
  url: string
}

export type { IPostFormValues, IPost, IPostUser, ITattooStyles }
