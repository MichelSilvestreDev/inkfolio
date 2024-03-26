export type PostFormValues = {
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

export type Post = {
  id: string
  user: PostUser
  title: string
  description: string
  price?: number
  styles: string[]
  urls: string[]
  created_at: string
  updated_at?: string
  deleted_at?: string
}

export type PostUser = {
  id: string
  email: string
  name: string
  avatar: string
}
