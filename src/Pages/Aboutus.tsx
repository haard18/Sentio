import { TimelineDemo } from '../Components/TimelineDemo'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const Aboutus = () => {
  return (
    <div className="flex min-h-screen flex-col bg-void text-phosphor">
      <Navbar />
      <main className="mt-14 flex-1">
        <TimelineDemo />
      </main>
      <Footer />
    </div>
  )
}

export default Aboutus
