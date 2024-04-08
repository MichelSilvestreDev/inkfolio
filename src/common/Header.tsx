

interface IHeader {
  title: string
  subtitle?: string
}

const Header: React.FC<IHeader> = ({title, subtitle}) => {
  return (
    <div className='w-full mb-4 relative'>
      <div className="container sm:text-center text-white ">
        <h1 className='text-2xl font-bold mb-2 pt-4'>{title}</h1>
        <h2 className='text-lg'>{subtitle}</h2>
      </div>
        <div className='w-full h-[200px] bg-primary absolute -z-10 top-0 left-0 overflow-hidden'>
          <div className='container container-left relative text-white'>
          </div>
        </div>
    </div>
  )
}

export default Header