import Topbar from '../../components/Topbar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/ui/WhatsAppButton';
import ScrollReveal from '../../components/ScrollReveal';
import { PrismaClient } from "@prisma/client";
import Image from 'next/image';

const prisma = new PrismaClient();

export default function ServiceDetail({ service }: { service: any }){
  if(!service) return null;
  return (
    <>
      <Topbar />
      <Header />
      <section className="min-h-screen py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal direction="scale">
              <div className="relative h-[500px] rounded-xl overflow-hidden mb-16 image-container">
                <Image src={service.imageUrl || '/images/placeholder.png'} alt={service.title} fill className="object-cover" />
                <div className="image-overlay"></div>
                <div className="absolute bottom-12 left-12 right-12 z-10">
                  <h1 className="text-5xl font-light text-white mb-6">{service.title}</h1>
                  <div className="flex flex-wrap gap-4">
                    <span className="badge text-base">{service.durationMin} min</span>
                    <span className="badge text-base font-medium">${service.price.toLocaleString("es-CO")}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal>
              <div className="card p-12 mb-12">
                <h2 className="text-3xl font-light mb-8 text-[var(--brand-yellow)]">Descripción del tratamiento</h2>
                <p className="text-gray-400 text-lg leading-relaxed">{service.longDesc || service.shortDesc}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="scale">
              <div className="card p-12 text-center">
                <h3 className="text-3xl font-light mb-6">
                  <span className="text-white">¿Interesado en</span>
                  <span className="text-[var(--brand-yellow)]"> este tratamiento?</span>
                </h3>
                <p className="text-gray-400 mb-8 text-lg">Contáctanos y obtén asesoría personalizada</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
                  <WhatsAppButton className="btn btn-primary px-8"
                    message={`¡Hola! Estoy interesad@ en: ${service.title} (${service.durationMin} min • $${service.price.toLocaleString("es-CO")}). ¿Podrían darme más información?`}
                    label="Agendar por WhatsApp" />
                  <a href="mailto:riveragonzalezjoshua404@gmail.com" className="btn btn-outline px-8">
                    Escribir correo
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export async function getStaticPaths(){
  try {
    const services = await prisma.service.findMany({ where: { published: true }, select: { slug: true }});
    return { paths: services.map(s => ({ params: { slug: s.slug } })), fallback: 'blocking' };
  } catch { return { paths: [], fallback: 'blocking' }; }
}

export async function getStaticProps({ params }: any){
  try {
    const service = await prisma.service.findFirst({ where: { slug: params.slug, published: true }});
    if(!service) return { notFound: true };
    const serializedService = { ...service, createdAt: service.createdAt.toISOString(), updatedAt: service.updatedAt.toISOString() };
    return { props: { service: serializedService }, revalidate: 60 };
  } catch { return { notFound: true }; }
}