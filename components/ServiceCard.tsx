// components/ServiceCard.tsx
import Link from 'next/link';
import Image from 'next/image';

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
      <div className="w-full h-40 relative mb-2">
        <Image src={service.imageUrl || '/placeholder.svg'} alt={service.title} fill style={{objectFit:'cover'}} />
      </div>
      <h3 className="font-semibold">{service.title}</h3>
      <p className="text-sm">{service.shortDesc}</p>
      <div className="mt-2 flex justify-between items-center">
        <span>{service.durationMin} min</span>
        <span className="font-bold">${service.price}</span>
      </div>
      <Link href={`/servicios/${service.slug}`} className="mt-3 inline-block text-blue-600 hover:underline">
        Ver más
      </Link>
    </div>
  );
}
