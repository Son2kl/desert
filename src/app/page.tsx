import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Bakery from '@/components/Bakery'
import Coffee from '@/components/Coffee'
import Menu from '@/components/Menu'
import Gallery from '@/components/Gallery'
import WhyUs from '@/components/WhyUs'
import Reviews from '@/components/Reviews'
import Contacts from '@/components/Contacts'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Bakery />
        <Coffee />
        <Menu />
        <Gallery />
        <WhyUs />
        <Reviews />
        <Contacts />
      </main>
      <Footer />
    </>
  )
}
