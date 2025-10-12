import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl" style={{color: "var(--brand-brown)"}}>
          Consultorio Odontológico
        </Link>
        <nav>
          <Link href="/servicios" className="mr-4">
            Servicios
          </Link>
          <a 
            href="https://wa.me/573001234567" 
            target="_blank" 
            rel="noreferrer" 
            className="px-3 py-2 rounded" 
            style={{background: "var(--brand-yellow)"}}
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}

