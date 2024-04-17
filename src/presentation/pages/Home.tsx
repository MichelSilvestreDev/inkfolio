import HomeHeader from "../components/home/HomeHeader"
import TattooStyles from "../components/home/TattooStyles"


const Home: React.FC = () => {
  return (
    <div className='w-full'>
      <HomeHeader />
      <TattooStyles />
    </div>
  )
}

export default Home