export type User = {
  uid: string
  displayName: string | null
  email: string | null
  emailVerified: boolean
  phoneNumber: string | null
  photoUrl: string | null
  isLogged: boolean
}

// type StsTokenManager = {
//   accessToken: string
//   expirationTime?: number
//   refreshToken: string
//   isExpired: boolean
// }

export type UserCredentials = {
  userEmail: string
  userPassword: string
}

export type UserFormValues = {
  email: string
  password: string
  displayName: string
}
