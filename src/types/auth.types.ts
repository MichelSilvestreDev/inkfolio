interface IUserData {
  uid: string
  displayName: string | null
  email: string | null
  emailVerified: boolean
  phoneNumber: string | null
  photoUrl: string | null
  isLogged: boolean
}

// type StsTokenManager {
//   accessToken: string
//   expirationTime?: number
//   refreshToken: string
//   isExpired: boolean
// }

interface IUserCredentials {
  userEmail: string
  userPassword: string
}

interface IUserFormValues {
  email: string
  password: string
}

export type { IUserData, IUserCredentials, IUserFormValues }
