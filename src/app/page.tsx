import Header from '@/components/Header'
import Hero from '@/components/Hero'
import DailyMenu from '@/components/DailyMenu'
import About from '@/components/About'
import Bakery from '@/components/Bakery'
import Coffee from '@/components/Coffee'
import Menu from '@/components/Menu'
import CakeConfigurator from '@/components/CakeConfigurator'
import Gallery from '@/components/Gallery'
import WhyUs from '@/components/WhyUs'
import Reviews from '@/components/Reviews'
import Contacts from '@/components/Contacts'
import Footer from '@/components/Footer'
import Preorder from '@/components/Preorder'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <DailyMenu />
        <About />
        <Bakery />
        <Coffee />
        <Menu />
        <CakeConfigurator />
        <Gallery />
        <WhyUs />
        <Reviews />
        <Contacts />
      </main>
      <Footer />
      <Preorder />
    </>
  )
}
