import Link from "next/link";
import Image from "next/image";
import WhatsAppButton from "./ui/WhatsAppButton";
import { MessageCircle } from "lucide-react";

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
  const message = `Hola, me interesa información sobre: ${service.title} (${service.durationMin} min)`;
  
  return (
    <article className="service-card-compact group">
      {/* Image Section */}
      <Link href={`/servicios/${service.slug}`} className="block relative h-24 overflow-hidden rounded-t-lg">
        <Image
          src={service.imageUrl || "/images/placeholder.png"}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Badge on image */}
        <div className="absolute top-1 right-1">
          <span className="badge text-[9px] px-1.5 py-0.5">{service.durationMin} min</span>
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-3">
        <Link href={`/servicios/${service.slug}`}>
          <h3 className="text-sm font-light text-white mb-1.5 line-clamp-2 hover:text-[var(--brand-yellow)] transition-colors">
            {service.title}
          </h3>
        </Link>
        
        <p className="text-[10px] text-gray-400 mb-2 line-clamp-2 leading-relaxed">
          {service.shortDesc}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-1.5">
          <Link 
            href={`/servicios/${service.slug}`}
            className="btn-compact-detail flex-1"
          >
            Ver más
          </Link>
          <a 
            href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "+573113440504").replace(/\D/g,"")}?text=${encodeURIComponent(message)}`}
            target="_blank" 
            rel="noreferrer"
            className="btn-compact-wa flex-1"
            aria-label="Contactar por WhatsApp"
          >
            <MessageCircle size={12} />
            <span className="text-[8px] font-bold">WA</span>
          </a>
        </div>
      </div>
    </article>
  );
}

