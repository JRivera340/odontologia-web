import Link from "next/link";
import WhatsAppButton from "./ui/WhatsAppButton";
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
      
      {/* Mobile Menu - Fixed full screen */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          {/* Ultra opaque background */}
          <div className="absolute inset-0 bg-black"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/95 to-gray-900/95"></div>
          
          <nav className="relative flex flex-col items-center justify-center h-full gap-6 px-6">
            {/* Main Pages */}
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Páginas</p>
              <div className="flex flex-col gap-4">
                <Link 
                  href="/" 
                  className="text-lg font-light text-white hover:text-[var(--brand-yellow)] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link 
                  href="/servicios" 
                  className="text-lg font-light text-white hover:text-[var(--brand-yellow)] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Catálogo Completo
                </Link>
              </div>
            </div>

            {/* Landing Sections */}
            <div className="text-center border-t border-gray-800 pt-6 w-full max-w-xs">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Navegar</p>
              <div className="flex flex-col gap-4">
                <Link 
                  href="/#servicios" 
                  className="text-lg font-light text-white hover:text-[var(--brand-yellow)] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Servicios Destacados
                </Link>
                <Link 
                  href="/#nosotros" 
                  className="text-lg font-light text-white hover:text-[var(--brand-yellow)] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Quiénes Somos
                </Link>
                <Link 
                  href="/#agendar" 
                  className="text-lg font-light text-white hover:text-[var(--brand-yellow)] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Agendar Cita
                </Link>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 w-full max-w-xs px-6 border-t border-gray-800">
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