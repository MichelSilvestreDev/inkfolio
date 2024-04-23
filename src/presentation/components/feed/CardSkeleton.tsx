import { Skeleton } from "@nextui-org/react"

const CardSkeleton: React.FC = () => {
  return (
    <div className='my-8 flex flex-col gap-4'>
      <div className="max-w-[300px] w-full flex items-center gap-3">
        <div>
          <Skeleton className="flex rounded-full w-12 h-12"/>
        </div>  
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg"/>
          <Skeleton className="h-3 w-4/5 rounded-lg"/>
        </div>
      </div>

      <Skeleton className="rounded-lg">
        <div className="h-64 rounded-lg bg-default-300"></div>
      </Skeleton>
    </div>
  )
}

export default CardSkeleton