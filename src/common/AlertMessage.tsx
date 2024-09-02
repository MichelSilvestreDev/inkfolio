import { Card, CardBody } from '@nextui-org/react'

interface IAlert {
  message: string
  status: 'error' | 'warning' | 'info' | 'success'
}

const ALertMessage: React.FC<IAlert> = ({message, status}) => {
  const alertStyles = {
    error: "bg-red-200 text-red-800",
    warning: "bg-amber-200 text-amber-800",
    info: "bg-cyan-200 text-cyan-800",
    success: "bg-green-300 text-green-800",
  }

  return (
    <Card className={`${alertStyles[status]} my-12`}>
      <CardBody>
        <p>{ message }</p>
      </CardBody>
    </Card>
  )
}

export default ALertMessage