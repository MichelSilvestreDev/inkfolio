export type PostFormValues = {
  user_id: string
  description: string
  price?: number
  styles: string[]
  urls: string[]
  location?: string
  tag_people?: string[]
  created_at: string
  updated_at?: string
  deleted_at?: string
}

export type Post = {
  id: string
  user_id: string
  description: string
  price?: number
  styles: string[]
  urls: string[]
  created_at: string
  updated_at?: string
  deleted_at?: string
}
