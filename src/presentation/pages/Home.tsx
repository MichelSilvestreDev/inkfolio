import Footer from "../../common/Footer"
import HomeHeader from "../components/home/HomeHeader"
import TattooStyles from "../components/home/TattooStyles"
import FeedContainer from "../containers/feed/Feed.container"


const Home: React.FC = () => {
  return (
    <div className='w-full'>
      <HomeHeader />
      <TattooStyles />

      <div className="container">
        <FeedContainer />
      </div>

      <Footer />
    </div>
  )
}

export default Home