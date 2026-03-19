import HeroSection from '@/components/HeroSection';
import ManifestoSection from '@/components/ManifestoSection';
import ReelSection from '@/components/ReelSection';
import WorldTransition from '@/components/WorldTransition';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ProcessSection from '@/components/ProcessSection';
import ClientsSection from '@/components/ClientsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import CustomCursor from '@/components/CustomCursor';

export default function Home() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navigation />
      <main>
        <HeroSection />
        <ManifestoSection />
        <ReelSection />
        <WorldTransition />
        <ServicesSection />
        <TestimonialsSection />
        <ProcessSection />
        <ClientsSection />
        <ContactSection />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
