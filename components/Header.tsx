import Link from "next/link";
import WhatsAppButton from "./ui/WhatsAppButton";
import { useState } from "react";

export default function Header(){
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b" style={{
      background: 'rgba(15, 15, 15, 0.98)',
      borderColor: 'rgba(102, 84, 52, 0.15)',
      backdropFilter: 'blur(20px)'
    }}>
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-5 flex items-center justify-between">
        {/* Logo Text */}
        <Link href="/" className="text-lg md:text-xl font-light tracking-wider hover:opacity-80 transition-opacity">
          <span className="text-white">Consultorio</span>
          <span className="text-[var(--brand-yellow)] ml-1">Dental</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#servicios" className="btn-ghost text-sm">Servicios</Link>
          <Link href="/#nosotros" className="btn-ghost text-sm">Nosotros</Link>
          <WhatsAppButton className="btn btn-wa text-sm" label="Agendar" />
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden relative w-10 h-10 flex items-center justify-center z-50"
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
      
      {/* Mobile Menu - Simple dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black border-t border-gray-800">
          <nav className="flex flex-col gap-4 p-6">
            <Link 
              href="/" 
              className="text-white hover:text-[var(--brand-yellow)] transition-colors py-2"
              onClick={() => setMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              href="/servicios" 
              className="text-white hover:text-[var(--brand-yellow)] transition-colors py-2"
              onClick={() => setMenuOpen(false)}
            >
              Catálogo Completo
            </Link>
            <Link 
              href="/#servicios" 
              className="text-white hover:text-[var(--brand-yellow)] transition-colors py-2"
              onClick={() => setMenuOpen(false)}
            >
              Servicios Destacados
            </Link>
            <Link 
              href="/#nosotros" 
              className="text-white hover:text-[var(--brand-yellow)] transition-colors py-2"
              onClick={() => setMenuOpen(false)}
            >
              Quiénes Somos
            </Link>
            <Link 
              href="/#agendar" 
              className="text-white hover:text-[var(--brand-yellow)] transition-colors py-2"
              onClick={() => setMenuOpen(false)}
            >
              Agendar Cita
            </Link>
            <div className="pt-4 border-t border-gray-800">
              <WhatsAppButton 
                className="btn btn-primary w-full text-sm py-3" 
                label="Agendar por WhatsApp" 
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}