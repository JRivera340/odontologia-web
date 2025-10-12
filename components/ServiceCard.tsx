// components/ServiceCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useCart } from '../context/CartContext';

type Props = {
  service: {
    id: number;
    title: string;
    slug: string;
    shortDesc?: string;
    durationMin: number;
    price: number;
    imageUrl?: string;
  };
};

export default function ServiceCard({ service }: Props) {
  const { add } = useCart();

  const handleAdd = () =>
    add({
      id: service.id,
      title: service.title,
      slug: service.slug,
      price: service.price,
      durationMin: service.durationMin,
      imageUrl: service.imageUrl,
    });

  return (
    <article className="border rounded p-4 bg-white shadow-sm">
      <div className="w-full h-40 relative mb-2 rounded overflow-hidden">
        <Image
          src={service.imageUrl || '/placeholder.svg'}
          alt={service.title}
          fill
          style={{ objectFit: 'cover' }}
          priority={false}
        />
      </div>

      <h3 className="font-semibold text-lg" title={service.title}>
        {service.title}
      </h3>

      {service.shortDesc && <p className="text-sm text-gray-600 mt-1">{service.shortDesc}</p>}

      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          <div>{service.durationMin} min</div>
          <div className="font-bold">${service.price}</div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <Link href={`/servicios/${service.slug}`} className="text-sm underline text-blue-600 hover:text-blue-800">
            Ver más
          </Link>

          <button
            onClick={handleAdd}
            aria-label={`Agregar ${service.title} al carrito`}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm"
            type="button"
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
