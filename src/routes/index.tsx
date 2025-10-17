import HeroSection from '@/components/custom/hero/HeroSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return < >
    <HeroSection />
    <div className='h-screen bg-black'></div>
  </>
}
