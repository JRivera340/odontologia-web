// pages/servicios/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import prisma from '../../lib/prisma';
import buildWhatsAppUrl from '../../lib/buildWhatsAppUrl';

type Service = {
  id: number;
  title: string;
  slug: string;
  longDesc?: string;
  shortDesc: string;
  durationMin: number;
  price: number;
  imageUrl?: string;
};

type Props = { service: Service; whatsappPhone: string };

export default function ServicePage({ service, whatsappPhone }: Props) {
  const handleWhatsApp = () => {
    const url = buildWhatsAppUrl(whatsappPhone, [{
      title: service.title,
      price: service.price,
      durationMin: service.durationMin
    }]);
    if (typeof window !== 'undefined') window.open(url, '_blank');
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="w-full h-80 relative rounded overflow-hidden">
            {service.imageUrl ? (
              <Image src={service.imageUrl} alt={service.title} fill style={{ objectFit: 'cover' }} />
            ) : (
              <Image src="/placeholder.svg" alt="placeholder" fill style={{ objectFit: 'contain' }} />
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--brand-brown)" }}>{service.title}</h1>
            <p className="mt-2 text-gray-700">{service.longDesc || service.shortDesc}</p>

            <div className="mt-4 flex items-center gap-6">
              <div><strong>Duración:</strong> {service.durationMin} min</div>
              <div><strong>Precio:</strong> ${service.price}</div>
            </div>

            <div className="mt-6">
              <button className="px-4 py-2 rounded" style={{ background: "var(--brand-yellow)" }} onClick={handleWhatsApp}>
                Contactar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const services = await prisma.service.findMany({ select: { slug: true } });
  const paths = services.map(s => ({ params: { slug: s.slug } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const service = await prisma.service.findUnique({
    where: { slug },
  });

  if (!service) {
    return { notFound: true };
  }

  return {
    props: {
      service: JSON.parse(JSON.stringify(service)),
      whatsappPhone: process.env.WHATSAPP_PHONE || '+573001234567'
    },
    revalidate: 3600
  };
};

