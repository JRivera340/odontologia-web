import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

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
  const { add } = useCart();
  
  const handleAdd = () => {
    add({
      id: service.id,
      title: service.title,
      slug: service.slug,
      price: service.price,
      durationMin: service.durationMin,
      imageUrl: service.imageUrl
    });
  };

  return (
    <div className="border rounded p-4">
      <div className="w-full h-40 relative mb-2">
        <Image 
          src={service.imageUrl || '/placeholder.svg'} 
          alt={service.title} 
          fill
          style={{objectFit: 'cover'}}
        />
      </div>
      <h3 className="font-semibold">{service.title}</h3>
      <p className="text-sm">{service.shortDesc}</p>
      <div className="mt-2 flex justify-between items-center">
        <span>{service.durationMin} min</span>
        <span className="font-bold">${service.price.toLocaleString()}</span>
      </div>
      <div className="mt-3 flex gap-2">
        <Link href={`/servicios/${service.slug}`} className="inline-block text-blue-600 hover:underline">
          Ver más
        </Link>
        <button 
          onClick={handleAdd} 
          className="ml-auto px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}

