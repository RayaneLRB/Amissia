import HeroSection from '../components/HeroSection';
import BrandIntro from '../components/BrandIntro';
import SignatureShowcase from '../components/SignatureShowcase';
import LifestyleBanner from '../components/LifestyleBanner';
import RitualSection from '../components/RitualSection';
import TestimonialsSection from '../components/TestimonialsSection';
import InstagramSection from '../components/InstagramSection';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onSelectFragrance: (id: string) => void;
}

export default function HomePage({ onNavigate, onSelectFragrance }: HomePageProps) {
  return (
    <>
      <HeroSection onNavigate={onNavigate} />
      <BrandIntro />
      <SignatureShowcase onNavigate={onNavigate} onSelectFragrance={onSelectFragrance} />
      <LifestyleBanner />
      <RitualSection />
      <TestimonialsSection />
      <InstagramSection />
    </>
  );
}
