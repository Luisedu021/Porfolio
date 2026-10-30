import { MotionConfig } from 'motion/react'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Education } from './components/sections/Education'
import { Experience } from './components/sections/Experience'
import { Footer } from './components/sections/Footer'
import { Header } from './components/sections/Header'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Services } from './components/sections/Services'

export default function App() {
  return (
    // reducedMotion="user": quem ativou "reduzir movimento" no sistema vê só fades, sem deslocamentos.
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
