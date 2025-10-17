import { GetServerSideProps } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ServiceCard from '../../components/ServiceCard';
import prisma from '../../lib/prisma';

interface Service {
  id: number;
  title: string;
  slug: string;
  shortDesc: string;
  durationMin: number;
  price: number;
  imageUrl?: string;
}

interface ServicesPageProps {
  services: Service[];
}

export default function ServicesPage({ services }: ServicesPageProps) {
  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
        <h2 className="text-2xl mb-4">Servicios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(s => <ServiceCard key={s.id} service={s} />)}
        </div>
      </main>
      <Footer />
    </>
  );
}

// ✅ SOLUCIÓN ROBUSTA PARA PRODUCCIÓN
// Cambio de SSG (getStaticProps) a SSR (getServerSideProps)
//
// ¿Por qué este cambio?
// 1. SSG + revalidación es complejo y frágil:
//    - No funciona en desarrollo (npm run dev)
//    - Requiere configuración especial en producción
//    - Puede causar inconsistencias (caché desincronizado)
//
// 2. SSR (Server-Side Rendering) es simple y robusto:
//    - ✅ Cambios visibles INMEDIATAMENTE (sin esperar 60 segundos)
//    - ✅ Funciona igual en desarrollo y producción
//    - ✅ No requiere revalidación manual
//    - ✅ Más predecible y fácil de debuggear
//
// 3. Rendimiento:
//    - En desarrollo: idéntico (ambos consultan BD)
//    - En producción con Vercel/Netlify: cachean automáticamente
//    - La diferencia de velocidad es imperceptible para usuarios
//
// 4. Escalabilidad:
//    - Vercel/Netlify cachean las respuestas automáticamente en CDN
//    - Para alto tráfico: agregar caché Redis (futuro)
//    - Para este proyecto (clínica pequeña): SSR es suficiente

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const services = await prisma.service.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        shortDesc: true,
        durationMin: true,
        price: true,
        imageUrl: true,
      },
    });

    return {
      props: {
        services: JSON.parse(JSON.stringify(services)),
      },
    };
  } catch (error) {
    console.error('Error fetching services:', error);
    return {
      props: {
        services: [],
      },
    };
  }
};
