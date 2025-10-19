export default function Footer(){
  return (
    <footer className="border-t" style={{
      background: 'rgba(15, 15, 15, 0.95)',
      borderColor: 'rgba(102, 84, 52, 0.15)'
    }}>
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h4 className="font-light text-lg mb-4 text-[var(--brand-yellow)]">Consultorio</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Cali, Valle del Cauca<br/>
              Colombia<br/>
              Lun–Vie: 8:00 - 18:00
            </p>
          </div>
          <div>
            <h4 className="font-light text-lg mb-4 text-[var(--brand-yellow)]">Contacto</h4>
            <div className="space-y-2 text-sm">
              <a 
                href="mailto:riveragonzalezjoshua404@gmail.com" 
                className="block text-gray-400 hover:text-[var(--brand-yellow)] transition-colors"
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
          <div>
            <h4 className="font-light text-lg mb-4 text-[var(--brand-yellow)]">Navegación</h4>
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
                <a href="/#sobre" className="text-gray-400 hover:text-[var(--brand-yellow)] transition-colors">
                  Nosotros
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 pt-8 border-t" style={{borderColor: 'rgba(102, 84, 52, 0.15)'}}>
          © {new Date().getFullYear()} Consultorio Odontológico • Diseño Minimalista
        </div>
      </div>
    </footer>
  );
}