export interface IPostFormValues {
  user_id: string
  description: string
  styles: string[]
  urls: string[]
  price?: number
  tags?: string[]
  location?: string
  created_at: string
  updated_at?: string
  deleted_at?: string
}

export interface IPost {
  id: string
  user: IPostUser
  description: string
  price?: number
  styles: string[]
  urls: string[]
  created_at: string
  updated_at?: string
  deleted_at?: string
}

export interface IPostUser {
  id: string
  email: string
  name: string
  avatar: string
}
