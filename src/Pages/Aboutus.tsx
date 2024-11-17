
import { TimelineDemo } from '../Components/TimelineDemo'
import Navbar from '../Components/Navbar'
import Footer from "../Components/Footer"
import { DotPatternHover } from '../Components/ui/Hoverdots'


const Aboutus = () => {
  return (
    <>
      <div className='app-background h-screen w-full app-background'>
        <section className=" relative">
          <Navbar />
        </section>
        <DotPatternHover>
          <div className="timeline pt-20  app-background">
            <TimelineDemo />
            <Footer />
          </div>
        </DotPatternHover>
      </div>

    </>
  )
}

export default Aboutus