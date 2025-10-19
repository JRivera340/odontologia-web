export default function Footer(){
  return (
    <footer className="border-t relative overflow-hidden" style={{
      background: 'rgba(15, 15, 15, 0.98)',
      borderColor: 'rgba(102, 84, 52, 0.15)'
    }}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 relative z-10">
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Location */}
          <div className="text-center md:text-left">
            <h4 className="font-light text-base md:text-lg mb-3 md:mb-4 text-[var(--brand-yellow)]">
              Ubicación
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Cali, Valle del Cauca<br/>
              Colombia
            </p>
            <p className="text-gray-500 text-xs mt-3">
              Lun–Vie: 8:00 AM - 6:00 PM
            </p>
          </div>
          
          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="font-light text-base md:text-lg mb-3 md:mb-4 text-[var(--brand-yellow)]">
              Contacto
            </h4>
            <div className="space-y-2 text-sm">
              <a 
                href="mailto:riveragonzalezjoshua404@gmail.com" 
                className="block text-gray-400 hover:text-[var(--brand-yellow)] transition-colors break-all"
              >
                riveragonzalezjoshua404@gmail.com
              </a>
              <a 
                href="https://wa.me/573113440504" 
                className="block text-gray-400 hover:text-[var(--brand-yellow)] transition-colors"
              >
                +57 311 344 0504
              </a>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="text-center md:text-left">
            <h4 className="font-light text-base md:text-lg mb-3 md:mb-4 text-[var(--brand-yellow)]">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#servicios" className="text-gray-400 hover:text-[var(--brand-yellow)] transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="/servicios" className="text-gray-400 hover:text-[var(--brand-yellow)] transition-colors">
                  Catálogo
                </a>
              </li>
              <li>
                <a href="/#nosotros" className="text-gray-400 hover:text-[var(--brand-yellow)] transition-colors">
                  Nosotros
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright - enhanced for mobile */}
        <div className="text-center text-xs text-gray-500 pt-6 md:pt-8 border-t" style={{borderColor: 'rgba(102, 84, 52, 0.15)'}}>
          <p className="mb-1">© {new Date().getFullYear()} Consultorio Odontológico</p>
          <p className="text-gray-600">Diseño Premium · Hecho con excelencia</p>
        </div>
      </div>
    </footer>
  );
}