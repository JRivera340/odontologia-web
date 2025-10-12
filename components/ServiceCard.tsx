import Link from 'next/link';

interface Service {
  id: number;
  title: string;
  slug: string;
  shortDesc: string;
  durationMin: number;
  price: number;
  imageUrl?: string;
}

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="border rounded p-4">
      <img 
        src={service.imageUrl || '/images/placeholder.png'} 
        alt={service.title} 
        className="w-full h-40 object-cover mb-2"
      />
      <h3 className="font-semibold">{service.title}</h3>
      <p className="text-sm">{service.shortDesc}</p>
      <div className="mt-2 flex justify-between items-center">
        <span>{service.durationMin} min</span>
        <span className="font-bold">${service.price.toLocaleString()}</span>
      </div>
      <Link href={`/servicios/${service.slug}`} className="mt-3 inline-block text-blue-600 hover:underline">
        Ver más
      </Link>
    </div>
  );
}

