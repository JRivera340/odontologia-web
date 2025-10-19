import Image from "next/image";
import Link from "next/link";
import WhatsAppButton from "./ui/WhatsAppButton";
export type ServiceDTO = { id:number; title:string; slug:string; shortDesc:string; longDesc?:string|null; durationMin:number; price:number; imageUrl?:string|null; published?:boolean };
export default function ServiceCardPro({ service }: { service: ServiceDTO }){
  const { title, slug, shortDesc, durationMin, price, imageUrl } = service;
  return (
    <article className="card overflow-hidden group h-full flex flex-col">
      <div className="relative h-64 image-container">
        <Image src={imageUrl || "/images/placeholder.png"} alt={title} fill className="object-cover" />
        <div className="image-overlay"></div>
      </div>
      <div className="p-8 flex-1 flex flex-col">
        <h3 className="text-2xl font-light text-white mb-4">{title}</h3>
        <p className="text-gray-400 leading-relaxed line-clamp-3 mb-6 flex-1">{shortDesc}</p>
        <div className="flex items-center justify-between mb-6 text-sm">
          <span className="badge">{durationMin} min</span>
          <span className="text-[var(--brand-yellow)] font-medium">${price.toLocaleString("es-CO")}</span>
        </div>
        <div className="flex gap-3">
          <Link href={`/servicios/${slug}`} className="btn btn-outline flex-1 text-center text-sm">
            Ver más
          </Link>
          <WhatsAppButton className="btn btn-wa flex-1 text-sm"
            message={`¡Hola! Me interesa el servicio: ${title} (${durationMin} min • $${price.toLocaleString("es-CO")}). ¿Podrían darme más información?`}
            label="Consultar" />
        </div>
      </div>
    </article>
  );
}
