export type PostFormValues = {
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

export type Post = {
  id: string
  user: PostUser
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
