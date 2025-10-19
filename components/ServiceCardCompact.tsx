import Link from "next/link";
import Image from "next/image";
import WhatsAppButton from "./ui/WhatsAppButton";

interface Service {
  id: number;
  title: string;
  slug: string;
  shortDesc: string;
  durationMin: number;
  price: number;
  imageUrl?: string;
}

export default function ServiceCardCompact({ service }: { service: Service }) {
  const message = `Hola, me interesa información sobre: ${service.title} (${service.durationMin} min • $${service.price.toLocaleString("es-CO")})`;
  
  return (
    <article className="service-card-compact group">
      {/* Image Section */}
      <Link href={`/servicios/${service.slug}`} className="block relative h-32 overflow-hidden rounded-t-lg">
        <Image
          src={service.imageUrl || "/images/placeholder.png"}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Badge on image */}
        <div className="absolute top-2 right-2">
          <span className="badge text-[10px]">{service.durationMin} min</span>
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-4">
        <Link href={`/servicios/${service.slug}`}>
          <h3 className="text-base font-light text-white mb-2 line-clamp-2 hover:text-[var(--brand-yellow)] transition-colors">
            {service.title}
          </h3>
        </Link>
        
        <p className="text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed">
          {service.shortDesc}
        </p>

        {/* Price and CTA */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[var(--brand-yellow)] font-medium text-sm">
            ${service.price.toLocaleString("es-CO")}
          </span>
          <WhatsAppButton 
            className="btn-compact" 
            message={message}
            label="Consultar"
          />
        </div>
      </div>
    </article>
  );
}

