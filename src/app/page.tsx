import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import PhotoFeature from '@/components/PhotoFeature'
import Menu from '@/components/Menu'
import Cakes from '@/components/Cakes'
import Reviews from '@/components/Reviews'
import Contacts from '@/components/Contacts'
import Footer from '@/components/Footer'
import Preorder from '@/components/Preorder'

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16 md:pt-20">
        <Hero />
        <About />

        <PhotoFeature
          image="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1920&q=90&fit=crop"
          eyebrow="Витрина"
          title="Авторские десерты и выпечка"
          subtitle="Каждый день — свежая выпечка, авторские десерты и торты по кусочкам"
          align="left"
        />

        <Menu />

        <PhotoFeature
          image="https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=1920&q=90&fit=crop"
          eyebrow="На заказ"
          title="Торт мечты для вашего праздника"
          subtitle="Авторский декор, 10 начинок на выбор, срок от 3 дней"
          ctaLabel="Собрать торт"
          ctaHref="#cakes"
          align="left"
          overlay="dark"
        />

        <Cakes />
        <Reviews />
        <Contacts />
      </main>
      <Footer />
      <Preorder />
    </>
  )
}
