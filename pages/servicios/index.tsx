import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Topbar from '../../components/Topbar';
import SectionHeader from '../../components/ui/SectionHeader';
import ServiceCardPro from '../../components/ServiceCardPro';
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
              subtitle="Conoce nuestros tratamientos especializados y resuelve tus dudas directamente por WhatsApp" 
            />
          </ScrollReveal>
          
          {services.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.map((s, i) => (
                <ScrollReveal key={s.id} delay={i * 100}>
                  <ServiceCardPro service={s} />
                </ScrollReveal>
              ))}
            </div>
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