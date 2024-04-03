import coverDefault from '/img/auth-bg-1.jpeg'

const ProfileCover: React.FC = () => {
  return (
    <div className='w-full h-[100px]'>
      <div className='w-screen h-[150px] bg-slate-500 text-white absolute left-0 overflow-hidden'>
        <img src={coverDefault} alt="" />
      </div>
    </div>
  )
}

export default ProfileCover