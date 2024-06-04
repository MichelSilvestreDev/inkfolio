
interface IMessage {
  errorMessage?: string
}

const ErrorMessage: React.FC<IMessage> = ({errorMessage}) => {
  if(errorMessage){
    return (
      <div className='m-2 text-red-500 text-xs rounded-sm'>
        <p>{errorMessage}</p>
      </div>
    )
  }
}

export default ErrorMessage