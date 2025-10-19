import Link from "next/link";
import WhatsAppButton from "./ui/WhatsAppButton";

export default function Header(){
  return (
    <header className="sticky top-0 z-50 border-b" style={{
      background: 'rgba(15, 15, 15, 0.95)',
      borderColor: 'rgba(102, 84, 52, 0.15)',
      backdropFilter: 'blur(20px)'
    }}>
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="text-xl font-light tracking-wider hover:opacity-80 transition-opacity">
          <span className="text-white">Consultorio</span>
          <span className="text-[var(--brand-yellow)] ml-1">Dental</span>
        </Link>
        <nav className="flex items-center gap-8">
          <Link href="/#servicios" className="btn-ghost text-sm hidden md:inline">Servicios</Link>
          <Link href="/#sobre" className="btn-ghost text-sm hidden md:inline">Nosotros</Link>
          <WhatsAppButton className="btn btn-wa text-sm" label="Agendar" />
        </nav>
      </div>
    </header>
  );
}