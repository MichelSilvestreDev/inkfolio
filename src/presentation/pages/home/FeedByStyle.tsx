import { useParams } from "react-router-dom"
import FeedByStyleContainer from "../../containers/feed/FeedByStyle.container"
import { Skeleton } from "@nextui-org/react"
import HomeHeader from "../../components/home/HomeHeader"
import TattooStyles from "../../components/home/TattooStyles"
import Footer from "../../../common/Footer"

const FeedByStyle:React.FC = () => {
  const {tattoo_style} = useParams()

  return (
    <div className='w-full'>
      <HomeHeader />
      <TattooStyles />

      <div className='container'>
        {
          tattoo_style ? (
            <FeedByStyleContainer tattooStyle={tattoo_style} />
          ) : (
            <div>
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          )
        }
      </div>

      <Footer />
    </div>
  )
}

export default FeedByStyle