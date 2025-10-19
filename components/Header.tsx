import Link from "next/link";
import WhatsAppButton from "./ui/WhatsAppButton";
import Image from "next/image";
import { useState } from "react";

export default function Header(){
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 border-b" style={{
      background: 'rgba(15, 15, 15, 0.98)',
      borderColor: 'rgba(102, 84, 52, 0.15)',
      backdropFilter: 'blur(20px)'
    }}>
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-5 flex items-center justify-between">
        {/* Logo - Responsive */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Image 
            src="/images/logoBlanco.png" 
            alt="Logo" 
            width={140} 
            height={45}
            className="h-10 md:h-12 w-auto"
            priority
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#servicios" className="btn-ghost text-sm">Servicios</Link>
          <Link href="/#nosotros" className="btn-ghost text-sm">Nosotros</Link>
          <WhatsAppButton className="btn btn-wa text-sm" label="Agendar" />
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-[var(--brand-yellow)] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-full h-0.5 bg-[var(--brand-yellow)] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-0.5 bg-[var(--brand-yellow)] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 top-[73px] bg-black/98 backdrop-blur-xl transition-all duration-500 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <nav className="flex flex-col items-center justify-center h-full gap-8 px-6">
          <Link 
            href="/#servicios" 
            className="text-2xl font-light text-white hover:text-[var(--brand-yellow)] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Servicios
          </Link>
          <Link 
            href="/#nosotros" 
            className="text-2xl font-light text-white hover:text-[var(--brand-yellow)] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Nosotros
          </Link>
          <Link 
            href="/servicios" 
            className="text-2xl font-light text-white hover:text-[var(--brand-yellow)] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Catálogo
          </Link>
          <div className="pt-8 w-full max-w-xs">
            <WhatsAppButton 
              className="btn btn-primary w-full text-base py-4" 
              label="Agendar por WhatsApp" 
            />
          </div>
        </nav>
      </div>
    </header>
  );
}