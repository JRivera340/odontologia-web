import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Topbar from '../../components/Topbar';
import SectionHeader from '../../components/ui/SectionHeader';
import ServiceCardPro from '../../components/ServiceCardPro';
import ServiceCardCompact from '../../components/ServiceCardCompact';
import ScrollReveal from '../../components/ScrollReveal';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function ServicesPage({ services }: { services: any[] }) {
  return (
    <>
      <Topbar />
      <Header />
      <main className="min-h-screen py-16 md:py-32 bg-pattern">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal>
            <SectionHeader 
              title="Catálogo de servicios" 
              subtitle="Descubre nuestros tratamientos especializados" 
            />
          </ScrollReveal>
          
          {services.length > 0 ? (
            <>
              {/* Mobile: Compact Grid (2 columns) */}
              <div className="grid grid-cols-2 gap-4 md:hidden">
                {services.map((s) => (
                  <ServiceCardCompact key={s.id} service={s} />
                ))}
              </div>
              
              {/* Desktop: Full Cards (3 columns) */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {services.map((s, i) => (
                  <ScrollReveal key={s.id} delay={i * 100}>
                    <ServiceCardPro service={s} />
                  </ScrollReveal>
                ))}
              </div>

              {/* Scroll Indicator for Mobile */}
              <div className="md:hidden text-center mt-8 scroll-indicator">
                <p className="text-xs text-gray-500 uppercase tracking-widest">
                  {services.length} Servicios Disponibles
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                No hay servicios disponibles en este momento.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  try {
    const servicesRaw = await prisma.service.findMany({ where: { published: true }, orderBy: { title: 'asc' }});
    const services = servicesRaw.map(s => ({ ...s, imageUrl: s.imageUrl || '/images/placeholder.png', createdAt: s.createdAt.toISOString(), updatedAt: s.updatedAt.toISOString() }));
    return { props: { services }, revalidate: 60 };
  } catch {
    return { props: { services: [] }, revalidate: 60 };
  }
}