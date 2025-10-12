import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ServiceCard from '../../components/ServiceCard';

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

export async function getStaticProps() {
  // Fallback sample data
  const services: Service[] = [
    { 
      id: 1, 
      title: 'Limpieza dental', 
      slug: 'limpieza-dental', 
      shortDesc: 'Limpieza profesional', 
      durationMin: 45, 
      price: 80000, 
      imageUrl: '/images/limpieza.jpg' 
    },
    { 
      id: 2, 
      title: 'Blanqueamiento dental', 
      slug: 'blanqueamiento-dental', 
      shortDesc: 'Blanqueamiento estético', 
      durationMin: 60, 
      price: 200000, 
      imageUrl: '/images/blanqueamiento.jpg' 
    }
  ];
  
  return { props: { services } };
}

