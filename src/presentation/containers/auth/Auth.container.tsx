import { Button, Input, Skeleton, Spinner, Tab, Tabs, Tooltip } from '@nextui-org/react'
import { useState } from 'react'
import { useAuth } from '../../../hooks/auth/useAuth'
import { IUserCredentials, IUserFormValues } from '../../../types/auth.types'

interface IContainer {
  isLogin: boolean
}

const AuthContainer: React.FC<IContainer> = ({isLogin}) => {
  // Hooks
  const { isLoading, sigIn, sigUp } = useAuth()
  // States
  const [userEmail, setUserEmail] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')
  const [selected, setSelected] = useState<string>(isLogin ? 'login' : 'sigup');

  const handleLogin = async (event: { preventDefault: () => void }) => {
    const userCreds: IUserCredentials = {
      userEmail: userEmail,
      userPassword: userPassword
    }
    event.preventDefault()
    await sigIn(userCreds)
  }

  const handleCreateAccount = async (event: { preventDefault: () => void }) => {
    const userCreds: IUserFormValues = {
      email: userEmail,
      password: userPassword
    }
    event.preventDefault()
    await sigUp(userCreds)
  }

  return (
    <div className='shadow-lg w-1/4 h-max min-w-96 flex flex-col gap-10 p-8 rounded bg-white'>
      <div>
        <h1 className='text-2xl text-center font-bold'>InkFolio</h1>
      </div>

      {/* =========== LOGIN FORM ================= */}
      <Tabs
        aria-label='Options'
        className='w-full flex justify-center'
        selectedKey={selected}
        onSelectionChange={(e:any)=> setSelected(e)}
      >
          <Tab key='login' title='Login'>
            {
              isLoading ? (
                <div className='flex flex-col gap-8'>
                  <Skeleton className='h-14 w-full rounded-lg'/>
                  <Skeleton className='h-14 w-full rounded-lg'/>
                  <Button
                    className='rounded-md'
                    color='primary'
                    size='lg'
                    type='submit'
                    disabled
                  >
                    <Spinner color='default' labelColor='foreground'/>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleLogin}>
                  <div className='flex flex-col gap-4'>
                    <Input
                      type='email'
                      label='E-mail'
                      radius='sm'
                      onChange={(event) => setUserEmail(event.target.value)}
                      required
                      />
                    <Input
                      type='password'
                      label='Senha'
                      radius='sm'
                      onChange={(event) => setUserPassword(event.target.value)}
                      required
                    />
                    <Tooltip content='Estamos trabalhando nessa função' color='warning' delay={800}>
                      <Button color='primary' variant='light' isDisabled>
                        Esqueci minha senha
                      </Button>
                    </Tooltip>
                    <Button
                      className='rounded-md'
                      color='primary'
                      size='lg'
                      type='submit'
                      disabled={isLoading}
                    >
                      { isLoading ? 'Carregando...' : 'Entrar' }
                    </Button>
                    {/* <Button
                      className='rounded-md'
                      color='primary'
                      size='lg'
                      variant='ghost'
                      type='submit'
                    >
                      Entrar com Google
                    </Button> */}
                  </div>
                </form>
              )
            }
          </Tab>

          {/* =========== CREATE ACCOUNT FORM ================= */}
          <Tab key='sigup' title='Criar conta'>
            {
              isLoading ? (
                <div className='flex flex-col gap-8'>
                  <Skeleton className='h-14 w-full rounded-lg'/>
                  <Skeleton className='h-14 w-full rounded-lg'/>
                  <Skeleton className='h-14 w-full rounded-lg'/>
                  <Button
                    className='rounded-md'
                    color='primary'
                    size='lg'
                    type='submit'
                    disabled
                  >
                    <Spinner color='default' labelColor='foreground'/>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleCreateAccount}>
                  <div className='flex flex-col gap-4'>
                    <Input
                      type='email'
                      label='E-mail'
                      radius='sm'
                      onChange={(event) => setUserEmail(event.target.value)}
                      required
                      />
                    <Input
                      type='password'
                      label='Senha'
                      radius='sm'
                      onChange={(event) => setUserPassword(event.target.value)}
                      required
                    />
                    <Button
                      className='rounded-md'
                      color='primary'
                      size='lg'
                      type='submit'
                      disabled={isLoading}
                    >
                      { isLoading ? 'Carregando...' : 'Criar conta' }
                    </Button>
                    {/* <Button
                      className='rounded-md'
                      color='primary'
                      size='lg'
                      variant='ghost'
                      type='submit'
                    >
                      Criar com Google
                    </Button> */}
                  </div>
                </form>
              )
            }
          </Tab>
      </Tabs>
    </div>
  )
}

export default AuthContainer