// pages/servicios/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import prisma from '../../lib/prisma';
import buildWhatsAppUrl from '../../lib/buildWhatsAppUrl';
import { useCart } from '../../context/CartContext';
import React from 'react';

type Service = {
  id: number;
  title: string;
  slug: string;
  longDesc?: string | null;
  shortDesc?: string | null;
  durationMin: number;
  price: number;
  imageUrl?: string | null;
};

type Props = {
  service: Service;
  whatsappPhone: string;
};

export default function ServicePage({ service, whatsappPhone }: Props) {
  const { add } = useCart();

  const handleAdd = () =>
    add({
      id: service.id,
      title: service.title,
      slug: service.slug,
      price: service.price,
      durationMin: service.durationMin,
      imageUrl: service.imageUrl || undefined,
    });

  const handleWhatsAppSingle = () => {
    const url = buildWhatsAppUrl(whatsappPhone, [
      { title: service.title, price: service.price, durationMin: service.durationMin },
    ]);
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

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleAdd}
                className="px-4 py-2 rounded"
                style={{ background: "var(--brand-yellow)" }}
                aria-label={`Agregar ${service.title} al carrito`}
              >
                Agregar al carrito
              </button>

              <button
                onClick={handleWhatsAppSingle}
                className="px-4 py-2 rounded border"
                aria-label={`Contactar por WhatsApp sobre ${service.title}`}
              >
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
  const paths = services.map((s) => ({ params: { slug: s.slug } }));
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
      whatsappPhone: process.env.NEXT_PUBLIC_WHATSAPP_PHONE || process.env.WHATSAPP_PHONE || '+573001234567',
    },
    revalidate: 3600,
  };
};
